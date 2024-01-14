import { Operator } from "@/lib/operators";
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

function TokenDisplay({ tokenDisplay }: tokenDisplayProps) {
  const single =
    tokenDisplay && (Object.keys(tokenDisplay).length === 1 ? true : false);
  return (
    <Accordion type={single ? "single" : "multiple"} collapsible>
      {tokenDisplay &&
        Object.keys(tokenDisplay).map((tId) => (
          <AccordionItem value={tId} key={tId}>
            <AccordionTrigger>{tId}</AccordionTrigger>
            <AccordionContent>
              <Token tokenId={tId} />
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}

export default TokenDisplay;
