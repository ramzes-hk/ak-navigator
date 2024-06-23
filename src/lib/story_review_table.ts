import path from "path";
import fs from "fs";
import { StoryReviewTable } from "./story_review_table_types";

export function getMainStory() {
  const data = getStoryReviewTable();
  return Object.values(data).filter((m) => {
    return m.actType === "MAIN_STORY";
  });
}

export function getStoryReviewTable(): StoryReviewTable {
  const fileName = path.join(
    process.cwd(),
    "operators",
    "story_review_table.json",
  );
  const raw = fs.readFileSync(fileName, "utf8");
  const data = JSON.parse(raw) as StoryReviewTable;
  return data;
}

export type ActivityToStory = {
  id: string;
  name: string;
  entryType: string;
  stories: {
    id: string;
    name: string;
    code: string;
  }[];
}[];

export function getActivityToStory(): ActivityToStory {
  const storyReview = getStoryReviewTable();
  const ats: ActivityToStory = [];
  Object.values(storyReview).forEach((act) =>
    ats.push({
      id: act.id,
      name: act.name,
      entryType: act.entryType,
      stories: act.infoUnlockDatas.map((story) => ({
        id: story.storyTxt,
        name: story.storyName,
        code: story.storyCode,
      })),
    }),
  );
  return ats;
}
