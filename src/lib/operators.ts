import path from "path";
import fs from "fs";

export type AllOpNames = {
  id: string;
  name: string;
}[];

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

interface Operator<T> {
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
  [key: string]: {
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

export async function getOpData(id: string): Promise<Operator<Level[][]>> {
  let fileName = path.join(process.cwd(), "operators", "character_table.json");
  let rawFile = fs.readFileSync(fileName, "utf8");
  const operators = JSON.parse(rawFile) as Operators;

  fileName = path.join(process.cwd(), "operators", "skill_table.json");
  rawFile = fs.readFileSync(fileName, "utf8");
  const skillsContent = JSON.parse(rawFile) as Skills;
  const skillDescription: Level[][] = [];

  const opReader = operators[id] as Operator<SkillIds[]>;
  for (let skill of operators[id].skills) {
    skillDescription.push(skillsContent[skill.skillId].levels);
  }
  return {
    ...opReader,
    skills: skillDescription,
  };
}

export interface TagsReplacement {
  [key: string]: string;
}

export const tagsReplacement: TagsReplacement = {
  "<@ba.vup>": "<span class='text-[#0098DC]'>",
  "<@ba.vdown>": "<span class='text-[#FF6237]'>",
  "</>": "</span>",
  "<@ba.rem>": "<br /><span class='text-[#F49800]'>",
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

interface Blackboard {
  key: string;
  value: number;
}

export function parseDescription(
  description: string,
  blackboard: Blackboard[],
  tagsReplacement: TagsReplacement,
  duration?: number,
): string {
  let desc = description;
  for (const key in tagsReplacement) {
    desc = desc.replace(RegExp(key, "g"), tagsReplacement[key]);
  }
  desc = replaceValues(desc, blackboard);
  desc = duration ? desc.replace(/{duration}/, String(duration)) : desc;
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
        desc = desc.replaceAll(match[0], Math.round(value * 100).toString() + "%");
      } else {
        desc = desc.replaceAll(match[0], String(value));
      }
    }
  });
  return desc;
}
