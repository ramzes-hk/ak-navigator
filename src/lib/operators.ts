import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { OpName, Operator, Level, Skills } from "./operators_types";
import { TaggedOperator, recruitIds } from "./recruitment_list";
import { subProfDict } from "./subProfDict";

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

interface getOpDataReturn {
  operator: Operator;
  skills: Level[][];
  subProfession: string;
}

export async function readFileAs<T>(
  location: [string, ...string[]],
): Promise<T> {
  const fileName = path.join(process.cwd(), ...location);
  const fileContent = await fsPromise.readFile(fileName, "utf8");
  const parsedContent = JSON.parse(fileContent) as T;
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
  const skills = opReader?.skills;
  if (!skills) {
    throw "No skills found";
  }
  skills.forEach((skill) => {
    if (!skill.skillId) return;
    skillIds.add(skill.skillId);
  });
  skillIds.forEach((sId) => {
    const skillLvls = skillsContent[sId]?.levels;
    if (!skillLvls) {
      throw "No skill levels";
    }
    return skillDescription.push(skillLvls);
  });
  const subProf = subProfDict[opReader.subProfessionId]!;
  return {
    operator: {
      ...opReader,
      id: opId,
    },
    skills: skillDescription,
    subProfession: subProf.subProfessionName,
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
    return Object.entries(operators)
      .filter(([id, _]) =>
        filter === "char"
          ? id.includes("char")
          : !id.includes("char") && !id.includes("512"),
      )
      .map(([id, op]) => ({ ...op, id: id }));
  }
  return Object.entries(operators)
    .filter((entry) => !entry[0].includes("512"))
    .map((entry) => ({ ...entry[1], id: entry[0] }));
}

export async function tagOperators(): Promise<TaggedOperator[]> {
  const ops = await Promise.all(recruitIds.map((id) => getOpData(id)));
  return ops.map((op) => {
    const tags = op.operator.tagList ?? [];
    tags.push(op.operator.position, op.operator.profession);
    if (op.operator.rarity[5] === "5" || op.operator.rarity[5] === "6") {
      if (op.operator.rarity[5] === "6") {
        tags.push("Top Operator");
      } else {
        tags.push("Senior Operator");
      }
    }
    return {
      id: op.operator.id ?? "",
      name: op.operator.name,
      profession: op.operator.profession,
      rarity: op.operator.rarity,
      position: op.operator.position,
      tags: tags,
    };
  });
}
