import { getNormalStages } from "./stage_table";
import { getMainStory } from "./story_review_table";
import { getActivities, getZoneToActivity } from "./activity_table";

export function getStagesByActivities() {
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

export function getStagesByActivitiesWName() {
  const stages = getNormalStages();
  const mainStory = getMainStory();
  const zoneToActivity = getZoneToActivity();
  const stagesByActivities: Record<string, {id: string, name: string}[]> = {};
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
          act.push({id: s.stageId, name: s.code});
        } else {
          act = [{id: s.stageId, name:s.code}];
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
          act.push({id: s.stageId, name: s.code});
      } else {
          act = [{id: s.stageId, name:s.code}];
      }
      stagesByActivities[actId] = act;
    });
  return stagesByActivities;
}

export function getActivitiesNames() {
  const mainStory = getMainStory();
  const activities = getActivities();
  const names: Record<string, {id: string, name: string}> = {};
  mainStory.forEach(m => names[m.id] = {id: m.id, name: m.name});
  activities.forEach(a => names[a.id] = {id: a.id, name: a.name});
  return names;
}
