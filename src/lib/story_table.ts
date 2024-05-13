import fs from "fs";
import path from "path";
import { StoryTable } from "./story_table_types";

export function getStoryTable(): StoryTable {
  const fileName = path.join(process.cwd(), "operators", "story_table.json");
  const raw = fs.readFileSync(fileName, "utf8");
  const data = JSON.parse(raw) as StoryTable;
  return data;
}
