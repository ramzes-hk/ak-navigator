import { getStoryReviewTable } from "@/lib/story_review_table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";
import Link from "next/link";
import { buttonVariants } from "./button";
import { getOpName } from "@/lib/db_queries";

function StoryMenu() {
  const storyReview = getStoryReviewTable();
  return (
    <Accordion className="container" type="single" collapsible>
      {Object.values(storyReview)
        .filter(
          (act) =>
            act.entryType.includes("ACTIVITY") ||
            act.entryType.includes("MAINLINE"),
        )
        .map((act) => (
          <AccordionItem key={act.id} value={act.id}>
            <AccordionTrigger>{act.name}</AccordionTrigger>
            <AccordionContent className="flex flex-col items-start">
              {act.infoUnlockDatas.map((unlock) => (
                <Link
                  key={unlock.storyId}
                  href={`story/${encodeURIComponent(unlock.storyTxt)}`}
                  className={buttonVariants({ variant: "link" })}
                >
                  {unlock.storyCode}
                  {unlock.avgTag.includes("Operation")
                    ? " - " + unlock.avgTag.split(" ")[0] + " "
                    : ""}{" "}
                  - {unlock.storyName}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      <AccordionItem value="oprec">
        <AccordionTrigger>Operator Record</AccordionTrigger>
        <AccordionContent className="flex flex-col items-start">
          {Object.values(storyReview)
            .filter((act) => act.entryType === "NONE")
            .map((act) => (
              <Link
                key={act.id}
                href={`story/${encodeURIComponent(
                  act.infoUnlockDatas[0]!.storyTxt,
                )}`}
                className={buttonVariants({ variant: "link" })}
              >
                {getOpName(act.id.split("_")[1]!).then((name) => name)} -{" "}
                {act.name}
              </Link>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default StoryMenu;
