import { Operator, getOpData } from "@/lib/operators";
import Token from "./token";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";

interface tokenDisplayProps {
  tokenDisplay: Operator<null>["displayTokenDict"];
}

async function TokenDisplay({ tokenDisplay }: tokenDisplayProps) {
  if (tokenDisplay === null) return;
  const single = Object.keys(tokenDisplay).length === 1 ? true : false;
  const namePromises = Object.keys(tokenDisplay).map((tId) => getOpData(tId));
  const names = await Promise.all(namePromises);
  return (
    <Accordion type={single ? "single" : "multiple"}>
      {Object.keys(tokenDisplay).map((tId, i) => {
        return (
          <AccordionItem value={tId} key={tId} className="w-full sm:w-3/4">
            <AccordionTrigger>{names[i].name}</AccordionTrigger>
            <AccordionContent>
              <Token tokenId={tId} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default TokenDisplay;
