import path from "path";
import fs from "fs";
import { Stage, StageTable } from "./stage_table_types";

export function getStages(): Record<string, Stage> {
  const fileName = path.join(process.cwd(), "operators", "stage_table.json");
  const raw = fs.readFileSync(fileName, "utf8");
  const data = JSON.parse(raw) as StageTable;
  return data.stages;
}

export function getNormalStages(): Record<string, Stage> {
  const stages = getStages();
  Object.keys(stages).forEach((key) => {
    const stage = stages[key] as Stage;
    if (
      stage.difficulty === "FOUR_STAR" ||
      stage.diffGroup === "TOUGH" ||
      stage.diffGroup === "EASY"
    ) {
      delete stages[key];
    }
  });
  return stages;
}

export function getStage(id: string): Stage | undefined {
  const stages = getStages();
  const stage = stages[id];
  return stage;
}
