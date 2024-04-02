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
  const stageids = Object.keys(stages).filter(
    (id) =>
      stages[id].difficulty !== "FOUR_STAR" &&
      stages[id].diffGroup !== "TOUGH" &&
      stages[id].diffGroup !== "EASY",
  );
  const actToStage: Record<string, Stage[]> = {};
  stageids
    .filter((id) => stages[id].stageType === "ACTIVITY")
    .forEach((id) => {
      const strippedStageId = id.replace(/_.*/, "");
      const actId =
        zoneToActivity[
          Object.keys(zoneToActivity).find((z) =>
            z.toLowerCase().includes(strippedStageId),
          ) ?? ""
        ] ?? strippedStageId;
      if (!actToStage[actId]) {
        actToStage[actId] = [stages[id]];
      } else {
        actToStage[actId] = [...actToStage[actId], stages[id]];
      }
    });
  return (
    <div className="container">
      <Accordion type="multiple">
        {getMainStory().map((a) => (
          <AccordionItem key={a.id} value={a.id}>
            <AccordionTrigger>{a.name}</AccordionTrigger>
            <AccordionContent>
              {stageids
                .filter((id) => stages[id].zoneId === a.id)
                .map((id) => (
                  <p key={id}>
                    {stages[id].code} - {stages[id].name}
                  </p>
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
        {Object.keys(actToStage).map((a) => (
          <AccordionItem key={a} value={a}>
            <AccordionTrigger>
              {activities.find((id) => id.id === a)?.name ?? a}
            </AccordionTrigger>
            <AccordionContent>
              {actToStage[a].map((s) => (
                <p key={s.code}>
                  {s.code} - {s.name}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Activites;
