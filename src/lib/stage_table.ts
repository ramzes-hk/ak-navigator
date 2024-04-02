import path from "path";
import fs from "fs";

export function getStages() {
  const fileName = path.join(process.cwd(), "operators", "stage_table.json");
  const raw = fs.readFileSync(fileName, "utf8");
  const data = JSON.parse(raw) as StageTable;
  return data.stages;
}
