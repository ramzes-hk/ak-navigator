import path from "path";
import fs from "fs";

type AllOpNames = {
    id: string;
    name: string;
  }[];

interface OpNames {
  [key: string]: {
    name: string;
  } 
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
    names.push({ id: key, name: contents[key]['name'] }); 
  }
  return names;
}

interface Ids {
  [key: string]: null;
}

interface IdsToReturn {
  params: {
    id: string;
  };
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
      params: {
        id: key.replace(/^char_/, ""),
      },
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
  }[]
}

interface Operators {
  [key: string]: {
    name: string;
    description: string;
    rarity: string;  
    profession: string;
    subProfessionId: string;
    trait: Trait | null;
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

interface Level {
  name: string;
  description: string;
}

export interface OpData {
  opName: string;
  description: string;
  rarity: string;
  profession: string;
  subProfessionId: string;
  trait: Trait | null;
  skills: Level[];
}

export async function getOpData(id: string): Promise<OpData> {
  let fileName = path.join(process.cwd(), "operators", "character_table.json");
  let rawFile = fs.readFileSync(fileName, "utf8");
  const operators = JSON.parse(rawFile) as Operators;

  fileName = path.join(process.cwd(), "operators", "skill_table.json");
  rawFile = fs.readFileSync(fileName, "utf8");
  const skillsContent = JSON.parse(rawFile) as Skills;
  const skillDescription: Level[] = [];
  let opName: string = "";
  let description: string = "";
  let rarity: string = "";
  let profession: string = "";
  let subProfessionId: string = "";
  let trait: Trait | null = null;
  for (const operatorId in operators) {
    if (operatorId !== id) continue;
    opName = operators[operatorId]["name"];
    description = operators[operatorId]["description"];
    rarity = operators[operatorId]["rarity"];
    profession = operators[operatorId]["profession"];
    subProfessionId = operators[operatorId]["subProfessionId"];
    trait = operators[operatorId]["trait"]; 
    for (let skill of operators[operatorId]["skills"]) {
      skillDescription.push(skillsContent[skill.skillId]["levels"][0]);
    }
    break;
  }
  return { 
    opName: opName, 
    description: description,
    rarity: rarity,
    profession: profession,
    subProfessionId: subProfessionId,
    trait: trait,
    skills: skillDescription 
  };
}
