import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { db } from "@/db/db";
import { operators } from "@/db/schema";
import { eq } from "drizzle-orm";

export type AllOpNames = OpName[];

export interface OpName {
  id: string;
  name: string;
}

interface OpNames {
  [key: string]: {
    name: string;
  };
}

export function getAllOpNames(): AllOpNames {
  const fileName = path.join(
    process.cwd(),
    "operators",
    "character_table.json",
  );
  const rawFile = fs.readFileSync(fileName, "utf8");
  const contents = JSON.parse(rawFile) as OpNames;
  const names: AllOpNames = [];
  for (const key in contents) {
    if (!key.includes("char_")) {
      continue;
    }
    names.push({ id: key, name: contents[key]["name"] });
  }
  return names;
}

interface Ids {
  [key: string]: null;
}

interface IdsToReturn {
  id: string;
}

export function getAllOpIds(): IdsToReturn[] {
  const fileName = path.join(
    process.cwd(),
    "operators",
    "character_table.json",
  );
  const rawFile = fs.readFileSync(fileName, "utf8");
  const contents = JSON.parse(rawFile) as Ids;

  const ids: IdsToReturn[] = [];
  for (const key in contents) {
    if (!key.includes("char") || key.includes("512_aprot")) {
      continue;
    }
    ids.push({
      id: key.replace(/^char_/, ""),
    });
  }
  return ids;
}

export async function getOpName(id: string): Promise<string> {
  const result = await db
    .select({ name: operators.name })
    .from(operators)
    .where(eq(operators.id, id));
  return result[0].name;
}

export interface Trait {
  candidates: {
    blackboard: {
      key: string;
      value: number;
    }[];
  }[];
}

interface Operators {
  [key: string]: Operator<SkillIds[]>;
}

export interface Operator<T> {
  id?: string;
  name: string;
  description: string;
  position: "MELEE" | "RANGED";
  tagList: string[];
  rarity: string;
  profession: string;
  subProfessionId: string;
  trait: Trait | null;
  phases: Phase[];
  skills: T;
  talents: Talent[] | null;
  potentialRanks: PotentialRank[];
  favorKeyFrames: FavorKeyFrame[];
}

interface SkillIds {
  skillId: string;
}

interface Skills {
  [skillId: string]: {
    levels: Level[];
  };
}

export interface Level {
  name: string;
  rangeId: string | null;
  description: string;
  skillType: string;
  durationType: string;
  spData: {
    spType: string | number;
    spCost: string;
    initSp: string;
  };
  duration: number;
  blackboard: {
    key: string;
    value: number;
  }[];
}

export interface Phase {
  rangeId: string;
  attributesKeyFrames: AttributesKeyFrame[];
}

export interface AttributesKeyFrame {
  level: number;
  data: Data;
}

export interface Talent {
  candidates: {
    unlockCondition: {
      phase: string;
      level: number;
    };
    requiredPotentialRank: number;
    prefabKey: string;
    name: string;
    description: string;
    blackboard: {
      key: string;
      value: number;
    }[];
  }[];
}

export interface PotentialRank {
  description: string;
}

export interface FavorKeyFrame {
  data: Data;
}

export interface Data {
  maxHp: number;
  atk: number;
  def: number;
  magicResistance: number;
  cost: number;
  blockCnt: number;
  baseAttackTime: number;
  respawnTime: number;
}

export async function readFileAs<T>(
  location: [string, ...string[]],
): Promise<T> {
  const fileName = path.join(process.cwd(), ...location);
  const prom = await fsPromise.readFile(fileName, "utf8");
  return JSON.parse(prom) as T;
}

export async function getOpData(opId: string): Promise<Operator<Level[][]>> {
  const operators = await readFileAs<Operators>([
    "operators",
    "character_table.json",
  ]);
  const skillsContent = await readFileAs<Skills>([
    "operators",
    "skill_table.json",
  ]);
  const skillDescription: Level[][] = [];

  const opReader = operators[opId];
  for (let skill of operators[opId].skills) {
    skillDescription.push(skillsContent[skill.skillId].levels);
  }
  return {
    ...opReader,
    id: opId,
    skills: skillDescription,
  };
}

export interface MappedOps {
  [key: string]: Operator<Level[][]>;
}

export async function getAllOpData(): Promise<Operator<Level[][]>[]> {
  const ids = getAllOpIds();
  const opPromise = ids.map((id) => getOpData("char_" + id.id));
  return await Promise.all(opPromise);
}

export async function getMenuData() {
  const result = await db
    .select({
      id: operators.id,
      name: operators.name,
      rarity: operators.rarity,
      profession: operators.profession,
      subProfessionId: operators.subProfessionId,
    })
    .from(operators);
  return result;
}

export interface TagsReplacement {
  [key: string]: string;
}

export const tagsReplacement: TagsReplacement = {
  "<@ba.vup>": "<span class='text-[#0098DC]'>",
  "<@ba.vdown>": "<span class='text-[#FF6237]'>",
  "</>": "</span>",
  "<@ba.rem>": "<span class='text-[#F49800]'>",
  "<\\$ba.camou>": "",
  "<\\$ba.charged>": "<br />",
  "<\\$ba.barrier>": "",
  "<\\$ba.protect>": "",
  "<\\$ba.stun>": "",
  "<\\$ba.dt.element>": "",
  "<@ba.talpu>": "<span class='text-[#0098DC]'>",
  "<\\$ba.sluggish>": "",
};

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface Blackboard {
  key: string;
  value: number;
}

export function parseDescription(
  description: string,
  blackboard: Blackboard[],
  tagsReplacement: TagsReplacement,
  duration?: number,
): string {
  let desc = description.replace("\n", "<br />");
  desc = replaceValues(desc, blackboard);
  desc = duration ? desc.replace(/{duration}/, String(duration)) : desc;
  for (const key in tagsReplacement) {
    desc = desc.replace(RegExp(key, "g"), tagsReplacement[key]);
  }
  return desc;
}

export function replaceValues(
  description: string,
  blackboard: Blackboard[],
): string {
  let desc = description;
  blackboard.forEach((placeholder) => {
    let value = Math.abs(placeholder.value);
    let pattern = RegExp(
      `\{(-*)${escapeRegExp(placeholder.key)}([^}]*)\}`,
      "gi",
    );
    let match = pattern.exec(desc);
    if (match === null) {
      pattern = RegExp(`\{${placeholder.key}\}`, "gi");
      desc = desc.replaceAll(pattern, String(value));
    } else {
      if (match[0].includes("%")) {
        desc = desc.replaceAll(
          match[0],
          Math.round(value * 100).toString() + "%",
        );
      } else {
        desc = desc.replaceAll(match[0], String(value));
      }
    }
  });
  return desc;
}
