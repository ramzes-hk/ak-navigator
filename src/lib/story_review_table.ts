import path from "path";
import fs from "fs";
import { StoryReviewTable } from "./story_review_table_types";

export function getMainStory() {
  const fileName = path.join(
    process.cwd(),
    "operators",
    "story_review_table.json",
  );
  const raw = fs.readFileSync(fileName, "utf8");
  const data = JSON.parse(raw) as StoryReviewTable;
  return Object.values(data).filter((m) => {
    return m.actType === "MAIN_STORY";
  });
}
