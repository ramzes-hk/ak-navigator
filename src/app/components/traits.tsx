import { Trait, parseDescription, replaceValues } from "@/lib/operators";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/table";

interface traitProps {
  description: string;
  traits: Trait | null;
}

function Trait({ description, traits }: traitProps) {
  const trait = parseDescription(
    description,
    traits?.candidates[0].blackboard ?? [],
  );
  return <p dangerouslySetInnerHTML={{ __html: trait }}></p>;
}

function TraitTable({ traits }: traitProps) {
  return (
    <Table className="w-full sm:w-1/2">
      <TableBody>
        {traits?.candidates.map((candidate, i) => {
          return (
            <TableRow className="" key={i}>
              <TableHead className="">{`E${candidate.unlockCondition.phase.replace(
                /PHASE_/,
                "",
              )}`}</TableHead>
              <TableCell
                dangerouslySetInnerHTML={{
                  __html: parseDescription(
                    candidate.overrideDescripton,
                    candidate.blackboard,
                  ),
                }}
              ></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

interface traitsProps {
  description: string;
  traits: Trait | null;
  isSingleTrait: boolean;
}

function Traits({ description, traits, isSingleTrait }: traitsProps) {
  return isSingleTrait ? (
    <Trait description={description} traits={traits} />
  ) : (
    <TraitTable description={description} traits={traits} />
  );
}

export default Traits;
