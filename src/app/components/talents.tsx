import { parseDescription } from "@/lib/operators";
import { Talent } from "@/lib/operators_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";

interface talentsProps {
  talents: Talent[];
}

function Talents({ talents }: talentsProps) {
  function getPromotion(phase: string) {
    return phase.replace(/PHASE_/, "");
  }

  function isSameName(talent: Talent): boolean {
    if (!talent.candidates || talent.candidates.length === 0) return true;
    const firstName = talent.candidates[0]?.name;
    return talent.candidates.slice(1).every((c) => c.name === firstName);
  }

  talents = talents.map((talent) => {
    if (talent.candidates === null) return talent;
    const filteredCandidates = talent.candidates.filter(
      (candidate) => candidate.name && candidate.description,
    );
    return {
      ...talent,
      candidates: filteredCandidates,
    };
  });

  if (talents.every((talent) => talent.candidates?.length === 0)) {
    return;
  }
  return (
    <Table className="w-1/2 border border-collapse divide-y">
      <TableHeader>
        <TableRow className="divide-x">
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Reqs</TableHead>
          <TableHead className="text-center">Desc</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {talents.map(
          (talent, i) =>
            talent.candidates?.map((candidate, j) => {
              const potential =
                candidate.requiredPotentialRank !== 0
                  ? " P" + (candidate.requiredPotentialRank + 1).toString()
                  : "";
              return (
                <TableRow
                  key={`row${i}-${j}`}
                  className="divide-x divide-y hover:bg-background"
                >
                  {(j === 0 || !isSameName(talent)) && (
                    <TableCell
                      className="hover:bg-muted/50 text-center"
                      rowSpan={
                        isSameName(talent) ? talent.candidates?.length : 1
                      }
                    >
                      {candidate.name}
                    </TableCell>
                  )}
                  <TableCell className="border text-center hover:bg-muted/50">
                    {"E" +
                      getPromotion(candidate.unlockCondition.phase) +
                      potential}
                    {candidate.unlockCondition.level !== 1 &&
                      " Lvl " + candidate.unlockCondition.level}
                  </TableCell>
                  <TableCell
                    className="hover:bg-muted/50"
                    dangerouslySetInnerHTML={{
                      __html: parseDescription(
                        candidate.description ?? "",
                        candidate.blackboard,
                      ),
                    }}
                  ></TableCell>
                </TableRow>
              );
            }),
        )}
      </TableBody>
    </Table>
  );
}

export default Talents;
