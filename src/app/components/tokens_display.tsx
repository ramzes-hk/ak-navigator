import { getOpData } from "@/lib/operators";
import { Operator } from "@/lib/operators_types";
import Token from "./token";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion";

interface tokenDisplayProps {
  tokenDisplay: Operator["displayTokenDict"];
}

async function TokenDisplay({ tokenDisplay }: tokenDisplayProps) {
  if (tokenDisplay === null) return;
  const namePromises = Object.keys(tokenDisplay).map((tId) => getOpData(tId));
  const names = await Promise.all(namePromises);
  return (
    <Accordion type="single" collapsible>
      {Object.keys(tokenDisplay).map((tId, i) => {
        return (
          <AccordionItem value={tId} key={tId} className="w-full sm:w-3/4">
            <AccordionTrigger>{names[i].operator.name}</AccordionTrigger>
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
