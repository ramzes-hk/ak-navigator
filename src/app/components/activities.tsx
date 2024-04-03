import { getActivities, getZoneToActivity } from "@/lib/activity_table";
import { getMainStory } from "@/lib/story_review_table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { getStages } from "@/lib/stage_table";

function Activites() {
  const stages = getStages();
  const activities = getActivities();
  const zoneToActivity = getZoneToActivity();
  const mainStory = getMainStory();
  const stageids = Object.values(stages)
    .filter(
      (stage) =>
        stage.difficulty !== "FOUR_STAR" &&
        stage.diffGroup !== "TOUGH" &&
        stage.diffGroup !== "EASY",
    )
    .map((stage) => stage.stageId);
  const actToStage: Record<string, Stage[]> = {};
  stageids
    .filter((id) => {
      const stage = stages[id];
      if (stage === undefined) {
        return false;
      }
      return stage.stageType === "ACTIVITY";
    })
    .forEach((id) => {
      const stage = stages[id];
      if (!stage) {
        return false;
      }
      const strippedStageId = id.replace(/_.*/, "");
      const actId =
        zoneToActivity[
          Object.keys(zoneToActivity).find((z) =>
            z.toLowerCase().includes(strippedStageId),
          ) ?? ""
        ] ?? strippedStageId;
      const act = actToStage[actId];
      if (!act) {
        actToStage[actId] = [stage];
      } else {
        act.push(stage);
      }
    });
  return (
    <div className="container">
      <Accordion type="multiple">
        {mainStory.map((a) => {
          if (!a) {
            return;
          }
          return (
            <AccordionItem key={a.id} value={a.id}>
              <AccordionTrigger>{a.name}</AccordionTrigger>
              <AccordionContent>
                {stageids
                  .filter((id) => {
                    const stage = stages[id];
                    if (!stage) {
                      return;
                    }
                    return stage.zoneId === a.id;
                  })
                  .map((id) => {
                    const stage = stages[id];
                    if (!stage) {
                      return;
                    }
                    return (
                      <p key={id}>
                        {stage.code} - {stage.name}
                      </p>
                    );
                  })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
        {Object.keys(actToStage).map((a) => {
          const act = actToStage[a];
          if (!act) {
            return;
          }
          return (
            <AccordionItem key={a} value={a}>
              <AccordionTrigger>
                {activities.find((id) => id.id === a)?.name ?? a}
              </AccordionTrigger>
              <AccordionContent>
                {act.map((s) => (
                  <p key={s.code}>
                    {s.code} - {s.name}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default Activites;
