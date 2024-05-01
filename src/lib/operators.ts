import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import { getStyle } from "./rich_text_styles";
import { getTerms } from "./term_description";
import { getUniequip } from "./modules_data";
import { OpName, Operator, Level, Skills, Blackboard } from "./operators_types";
import { TaggedOperator, recruitIds } from "./recruitment_list";

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
  const subProf = getUniequip().subProfDict[opReader.subProfessionId];
  if (!subProf) {
    throw "No subprofession";
  }
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
    return Object.keys(operators)
      .filter((id) =>
        filter === "char" ? id.includes("char") : !id.includes("char"),
      )
      .filter((id) => !id.includes("512"))
      .map((id) => {
        const operator = operators[id];
        if (!operator) {
          throw "No operator found";
        }
        return { ...operator, id: id };
      });
  }
  return Object.keys(operators)
    .filter((id) => !id.includes("512"))
    .map((id) => {
      const operator = operators[id];
      if (!operator) {
        throw "No operator found";
      }
      return { ...operator, id: id };
    });
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
  const styles = getStyle();
  for (const key in styles) {
    const style = styles[key];
    if (style === undefined) {
      throw `No style found ${key}`;
    }
    description = description.replace(RegExp(key, "g"), style);
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
      `\{-*${escapeRegExp(placeholder.key)}(?::0%)?\}`,
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
