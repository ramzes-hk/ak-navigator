import fs from "fs";
import path from "path";
import { ActivityTable } from "./activity_table_types";

export function getActivities() {
  const file = path.join(process.cwd(), "operators", "activity_table.json");
  const data = fs.readFileSync(file, "utf8");
  const act = JSON.parse(data) as ActivityTable;
  return Object.values(act.basicInfo)
    .filter((val) => val.hasStage && !val.isReplicate)
    .map((val) => val.name);
}
