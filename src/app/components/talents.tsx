import { Talent, parseDescription, TagsReplacement } from "@/lib/operators";

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

  function isSameDesc(talent: Talent): boolean {
    const firstDesc = talent.candidates.at(0)?.description;
    for (let i = 1; i < talent.candidates.length; i++) {
      if (talent.candidates[i].description !== firstDesc) {
        return false;
      }
    }
    return true;
  }
  return (
    <table className="w-1/2 text-center border border-collapse divide-y">
      <caption>Talents</caption>
      <thead>
        <tr key="headers" className="divide-x">
          <th>Name</th>
          <th>Reqs</th>
          <th>Desc</th>
        </tr>
      </thead>
      <tbody>
        {talents.map((candidate, i) =>
          candidate.candidates.map((talent, j) => {
            const potential =
              talent.requiredPotentialRank !== 0
                ? " P" + (talent.requiredPotentialRank + 1).toString()
                : "";
            return (
              <tr key={`row${i}-${j}`} className="divide-x divide-y">
                <td
                  rowSpan={
                    isSameDesc(candidate) ? candidate.candidates.length : 1
                  }
                  className="px-1"
                >{`${talent.name}`}</td>
                <td className="border px-1">
                  {"E" + getPromotion(talent.unlockCondition.phase) + potential}
                  {talent.unlockCondition.level !== 1 &&
                    " Lvl " + talent.unlockCondition.level}
                </td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: parseDescription(
                      talent.description,
                      talent.blackboard,
                      tagsReplacement,
                    ),
                  }}
                ></td>
              </tr>
            );
          }),
        )}
      </tbody>
    </table>
  );
}

export default Talents;
