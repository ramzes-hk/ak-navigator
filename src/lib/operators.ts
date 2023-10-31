import path from "path";
import fs from "fs";

type AllOpNames = {
  id: string;
  name: string;
}[];

interface OpNames {
  [key: string]: {
    name: string;
  };
}

export async function getAllOpNames(): Promise<AllOpNames> {
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
  [key: string]: {
    name: string;
    description: string;
    rarity: string;
    profession: string;
    subProfessionId: string;
    trait: Trait | null;
    phases: Phase[];
    skills: SkillIds[];
  };
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
    spType: string;
    spCost: string;
    initSp: string;
  };
  duration: number;
  blackboard: {
    key: string;
    value: number;
  }[];
}

export interface OpData {
  name: string;
  description: string;
  rarity: string;
  profession: string;
  subProfessionId: string;
  trait: Trait | null;
  phases: Phase[];
  skills: Level[][];
}

interface opReader {
  name: string;
  description: string;
  rarity: string;
  profession: string;
  subProfessionId: string;
  trait: Trait | null;
  phases: Phase[];
}

export interface Phase {
  rangeId: string;
  attributesKeyFrames: attributesKeyFrame[];
}

export interface attributesKeyFrame {
  level: number;
  data: {
   maxHp: number;
   atk: number;
   def: number;
   magicResistance: number;
   cost: number;
   blockCnt: number;
   baseAttackTime: number;
   respawnTime: number;
  }
}

export async function getOpData(id: string): Promise<OpData> {
  let fileName = path.join(process.cwd(), "operators", "character_table.json");
  let rawFile = fs.readFileSync(fileName, "utf8");
  const operators = JSON.parse(rawFile) as Operators;

  fileName = path.join(process.cwd(), "operators", "skill_table.json");
  rawFile = fs.readFileSync(fileName, "utf8");
  const skillsContent = JSON.parse(rawFile) as Skills;
  const skillDescription: Level[][] = [];
  let opReader: opReader;

  for (const operatorId in operators) {
    if (operatorId !== id) continue;
    opReader = operators[operatorId]; 
    
    for (let skill of operators[operatorId]["skills"]) {
      skillDescription.push(skillsContent[skill.skillId]["levels"]);
    }
    break;
  }
  return {
    ...opReader, 
    skills: skillDescription,
  };
}
