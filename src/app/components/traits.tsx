import { Trait } from "@/lib/operators_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/table";
import { HandbookEnemy } from "@/lib/enemy_handbook_table_types";
import { ParsedDescription } from "@/lib/parse_description";

interface traitProps {
  description: string;
  traits: Trait | null;
}

function TraitDisplay({ description, traits }: traitProps) {
  return (
    <p>
      <ParsedDescription
        description={description}
        blackboard={traits?.candidates[0]?.blackboard ?? []}
      />
    </p>
  );
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
              <TableCell>
                <ParsedDescription
                  description={candidate.overrideDescripton}
                  blackboard={candidate.blackboard}
                />
              </TableCell>
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
    <TraitDisplay description={description} traits={traits} />
  ) : (
    <TraitTable description={description} traits={traits} />
  );
}

interface enemyTraitsProps {
  traits: HandbookEnemy["abilityList"];
}

export function EnemyTraits({ traits }: enemyTraitsProps) {
  return (
    <div className="w-full sm:w-3/4">
      {traits.map((trait) => {
        if (trait.textFormat === "NORMAL") {
          return (
            <p key={trait.text}>
              {" "}
              - <ParsedDescription description={trait.text} blackboard={[]} />
            </p>
          );
        } else if (trait.textFormat === "TITLE") {
          return (
            <p key={trait.text} color="red">
              {trait.text}
            </p>
          );
        } else {
          return (
            <p key={trait.text}>
              {" "}
              X <ParsedDescription description={trait.text} blackboard={[]} />
            </p>
          );
        }
      })}
    </div>
  );
}

export default Traits;
