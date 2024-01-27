import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { db } from "@/db/db";
import { operators } from "@/db/schema";
import { eq, like, notLike } from "drizzle-orm";
import { getStyle } from "./rich_text_styles";
import { getTerms } from "./term_description";
import { getUniequip } from "./modules_data";

export interface OpName {
  id: string;
  name: string;
}

export function getAllOpNames(filter?: "char" | "token&trap"): OpName[] {
  const fileName = path.join(
    process.cwd(),
    "operators",
    "character_table.json",
  );
  const rawFile = fs.readFileSync(fileName, "utf8");
  const contents = JSON.parse(rawFile) as Record<string, any>;
  const names: OpName[] = [];
  for (const key in contents) {
    if (filter) {
      if (filter === "char" ? !key.includes("char") : key.includes("char")) {
        continue;
      }
    }
    if (key.includes("512")) continue;
    names.push({ id: key, name: contents[key]["name"] });
  }
  return names;
}

export async function getOpName(id: string): Promise<string> {
  const result = await db
    .select({ name: operators.name })
    .from(operators)
    .where(eq(operators.id, id));
  return result[0].name;
}

export interface Blackboard {
  key: string;
  value: number;
  valueStr: string | null;
}

export interface Trait {
  candidates: {
    blackboard: Blackboard[];
    unlockCondition: UnlockCond;
    overrideDescripton: string;
  }[];
}

interface UnlockCond {
  phase: string;
  level: number;
}

export interface LvlUpCost {
  id: string;
  count: number;
  type: string;
}

export interface Operator {
  id?: string;
  name: string;
  description: string | null;
  potentialItemId: string | null;
  nationId: string | null;
  groupId: string | null;
  teamId: string | null;
  displayNumber: string | null;
  appellation: string;
  position: "MELEE" | "RANGED" | "ALL" | "NONE";
  tagList: string[] | null;
  itemUsage: string | null;
  itemDesc: string | null;
  itemObtainApproach: string | null;
  isNotObtainable: boolean;
  maxPotentialLevel: number;
  isSpChar: boolean;
  rarity: string;
  profession: string;
  subProfessionId: string;
  trait: Trait | null;
  phases: Phase[];
  skills: SkillIds[];
  displayTokenDict: Record<string, boolean> | null;
  talents: Talent[] | null;
  potentialRanks: PotentialRank[];
  favorKeyFrames: FavorKeyFrame[] | null;
  allSkillLvlup: {
    unlockCond: UnlockCond;
    lvlUpCost: LvlUpCost[] | null;
  }[];
}

interface SkillIds {
  skillId: string | null;
  levelUpCostCond: {
    unlockCond: UnlockCond;
    lvlUpTime: number;
    levelUpCost: LvlUpCost[] | null;
  }[];
}

interface Skills {
  [skillId: string]: {
    skillId: string;
    levels: Level[];
  };
}

export interface Level {
  name: string;
  rangeId: string | null;
  description: string | null;
  skillType: string;
  durationType: string;
  spData: {
    spType: string | number;
    spCost: string;
    initSp: string;
  };
  duration: number;
  blackboard: Blackboard[];
}

export interface Phase {
  rangeId: string | null;
  attributesKeyFrames: AttributesKeyFrame[];
  evolveCost: LvlUpCost[] | null;
}

export interface AttributesKeyFrame {
  level: number;
  data: Data;
}

export interface Talent {
  candidates:
    | {
        unlockCondition: UnlockCond;
        requiredPotentialRank: number;
        prefabKey: string;
        name: string | null;
        description: string | null;
        rangeId: string | null;
        blackboard: Blackboard[];
        tokenKey: string | null;
      }[]
    | null;
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

interface getOpDataReturn {
  operator: Operator;
  skills: Level[][];
  subProfession: string;
}
const fileCache = new Map();

export async function readFileAs<T>(
  location: [string, ...string[]],
): Promise<T> {
  const fileName = path.join(process.cwd(), ...location);
  if (fileCache.has(fileName)) {
    return fileCache.get(fileName) as T;
  }
  const fileContent = await fsPromise.readFile(fileName, "utf8");
  const parsedContent = JSON.parse(fileContent) as T;
  fileCache.set(fileName, parsedContent);
  return parsedContent;
}

export async function getOpData(opId: string): Promise<getOpDataReturn> {
  const operators = await readFileAs<Record<string, Operator>>([
    "operators",
    "character_table.json",
  ]);
  const skillsContent = await readFileAs<Skills>([
    "operators",
    "skill_table.json",
  ]);
  const skillIds: Set<string> = new Set<string>();
  const skillDescription: Level[][] = [];
  const opReader = operators[opId];
  opReader.skills.forEach((skill) => {
    if (!skill.skillId) return;
    skillIds.add(skill.skillId);
  });
  skillIds.forEach((sId) => skillDescription.push(skillsContent[sId].levels));
  return {
    operator: {
      ...opReader,
      id: opId,
    },
    skills: skillDescription,
    subProfession:
      getUniequip().subProfDict[opReader.subProfessionId].subProfessionName,
  };
}

export type MappedOps = Record<string, Operator>;

export async function getAllOpData(
  filter: "char" | "token&trap" | undefined,
): Promise<Operator[]> {
  const operators = await readFileAs<Record<string, Operator>>([
    "operators",
    "character_table.json",
  ]);
  if (filter !== undefined) {
    return Object.keys(operators)
      .filter((id) =>
        filter === "char" ? id.includes("char") : !id.includes("char"),
      )
      .filter((id) => !id.includes("512"))
      .map((id) => ({ ...operators[id], id: id }));
  }
  return Object.keys(operators)
    .filter((id) => !id.includes("512"))
    .map((id) => ({ ...operators[id], id: id }));
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
    .from(operators)
    .where(like(operators.id, "%char%"));
  return result;
}

export async function getEntitiesMenuData() {
  const result = await db
    .select({
      id: operators.id,
      name: operators.name,
      rarity: operators.rarity,
      profession: operators.profession,
      subProfessionId: operators.subProfessionId,
    })
    .from(operators)
    .where(notLike(operators.id, "%char%"));
  return result;
}

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function parseDescription(
  description: string,
  blackboard: Blackboard[],
  duration?: number,
): string {
  description = description.replaceAll("\n", "<br />");
  description = replaceValues(description, blackboard);
  description = duration
    ? description.replace(/{duration}/, String(duration))
    : description;
  const style = getStyle();
  for (const key in style) {
    description = description.replace(RegExp(key, "g"), style[key]);
  }
  for (const key in getTerms()) {
    description = description.replace(RegExp(key, "g"), " ");
  }
  return description;
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
