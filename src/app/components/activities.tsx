import { getActivities } from "@/lib/activity_table";
import { getMainStory } from "@/lib/story_review_table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { getNormalStages } from "@/lib/stage_table";
import Link from "next/link";
import { buttonVariants } from "./button";
import { getStagesByActivities } from "@/lib/stage_by_activity";

function Activites() {
  const stagesByActivity = getStagesByActivities();
  const stages = getNormalStages();
  const activities = getActivities();
  const mainStory = getMainStory();
  return (
    <div className="container">
      <Accordion type="multiple">
        {mainStory.map((a, i) => {
          return (
            <AccordionItem key={a.id} value={a.id}>
              <AccordionTrigger>Ch. {i} - {a.name}</AccordionTrigger>
              <AccordionContent className="flex flex-col items-start">
                {Object.entries(stagesByActivity)
                  .find((entry) => entry.includes(a.id))![1]
                  .map((s) => {
                    const stage = stages[s];
                    if (!stage) {
                      return;
                    }
                    return (
                      <Link
                        className={buttonVariants({ variant: "link" })}
                        key={s}
                        href={`/stages/${s}`}
                      >
                        {stage.code} - {stage.name}
                      </Link>
                    );
                  })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
        {Object.entries(stagesByActivity)
          .filter((entry) => !entry[0].includes("main"))
          .map(([id, sts]) => {
            const act = activities.find((a) => a.id === id)!;
            if (!act) {
              return;
            }
            return (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger>{stages[sts[0]!]?.code.split("-")[0]} - {act.name}</AccordionTrigger>
                <AccordionContent className="flex flex-col items-start">
                  {sts.map((s) => {
                    const stage = stages[s];
                    if (!stage) {
                      return;
                    }
                    return (
                      <Link
                        className={buttonVariants({ variant: "link" })}
                        key={s}
                        href={`/stages/${s}`}
                      >
                        {stage.code} - {stage.name}
                      </Link>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
}

export default Activites;
