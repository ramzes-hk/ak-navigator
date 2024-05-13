import { getNormalStages } from "./stage_table";
import { getMainStory } from "./story_review_table";
import { getZoneToActivity } from "./activity_table";
import path from "path";
import fs from "fs";

cache();

function cache() {
  const fileName = path.join(
    process.cwd(),
    "operators",
    "stages_by_activities_cache.json",
  );
  const stagesByActivities = StagesByActivities();
  fs.writeFile(fileName, JSON.stringify(stagesByActivities, null, 1), (e) => {
    if (!e) return;
    console.log("failed to write stages by activites cache", e);
  });
}

function StagesByActivities() {
  const stages = getNormalStages();
  const mainStory = getMainStory();
  const zoneToActivity = getZoneToActivity();
  const stagesByActivities: Record<string, string[]> = {};
  //add mainstory stages
  mainStory.forEach((m) =>
    Object.values(stages)
      .filter(
        (s) =>
          s.zoneId === m.id &&
          (s.stageType === "MAIN" || s.stageType === "SUB"),
      )
      .forEach((s) => {
        let act = stagesByActivities[m.id];
        if (act) {
          act.push(s.stageId);
        } else {
          act = [s.stageId];
        }
        stagesByActivities[m.id] = act;
      }),
  );
  //add activities
  Object.values(stages)
    .filter((s) => s.stageType === "ACTIVITY")
    .forEach((s) => {
      const strippedStageId = s.stageId.replace(/_.*/, "");
      const actId =
        zoneToActivity[
          Object.keys(zoneToActivity).find((z) =>
            z.toLowerCase().includes(strippedStageId),
          ) ?? ""
        ] ?? "";
      let act = stagesByActivities[actId];
      if (act) {
        act.push(s.stageId);
      } else {
        act = [s.stageId];
      }
      stagesByActivities[actId] = act;
    });
  return stagesByActivities;
}
