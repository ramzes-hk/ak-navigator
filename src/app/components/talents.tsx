import { Talent, parseDescription, TagsReplacement } from "@/lib/operators";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";

const tagsReplacement: TagsReplacement = {
  "<@ba.vup>": "<span class='text-[#0098DC]'>",
  "<@ba.vdown>": "<span class='text-[#FF6237]'>",
  "</>": "</span>",
  "<@ba.rem>": "<br /><span class='text-[#F49800]'>",
  "<\\$ba.camou>": "",
  "<\\$ba.charged>": "<br />",
  "<\\$ba.barrier>": "",
  "<\\$ba.protect>": "",
  "<\\$ba.stun>": "",
  "<\\$ba.dt.element>": "",
  "<@ba.talpu>": "<span class='text-[#0098DC]'>",
  "<\\$ba.sluggish>": "",
};

interface talentsProps {
  talents: Talent[];
}

function Talents({ talents }: talentsProps) {
  function getPromotion(phase: string) {
    return phase.replace(/PHASE_/, "");
  }

  function isSameName(talent: Talent): boolean {
    if (!talent.candidates || talent.candidates.length === 0) return true;
    const firstName = talent.candidates[0].name;
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
    <Table className="w-1/2 text-center border border-collapse divide-y">
      <caption>Talents</caption>
      <TableHeader>
        <TableRow className="divide-x">
          <th>Name</th>
          <th>Reqs</th>
          <th>Desc</th>
        </TableRow>
      </TableHeader>
      <tbody>
        {talents.map(
          (talent, i) =>
            talent.candidates?.map((candidate, j) => {
              const potential =
                candidate.requiredPotentialRank !== 0
                  ? " P" + (candidate.requiredPotentialRank + 1).toString()
                  : "";
              return (
                <TableRow key={`row${i}-${j}`} className="divide-x divide-y">
                  {(j === 0 || !isSameName(talent)) && (
                    <TableCell
                      rowSpan={
                        isSameName(talent) ? talent.candidates?.length : 1
                      }
                    >
                      {candidate.name}
                    </TableCell>
                  )}
                  <TableCell className="border px-1">
                    {"E" +
                      getPromotion(candidate.unlockCondition.phase) +
                      potential}
                    {candidate.unlockCondition.level !== 1 &&
                      " Lvl " + candidate.unlockCondition.level}
                  </TableCell>
                  <TableCell
                    dangerouslySetInnerHTML={{
                      __html: parseDescription(
                        candidate.description ?? "",
                        candidate.blackboard,
                        tagsReplacement,
                      ),
                    }}
                  ></TableCell>
                </TableRow>
              );
            }),
        )}
      </tbody>
    </Table>
  );
}

export default Talents;
