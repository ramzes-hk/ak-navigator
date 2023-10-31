import { Talent } from "@/components/lib/operators"

interface talentsProps {
  talents: Talent[];
}

function Talents({ talents }: talentsProps) {
  function getPromotion(phase: string) {
    return phase.replace(/PHASE_/, "");
  }
  return (
    <table className="border border-collapse border-black divide-y divide-black">
      <caption>
        Talents
      </caption>
      <tr className="divide-x divide-black">
        <th>Talent</th>
        <th>Name</th>
        <th>Requirements</th>
        <th>Description</th>
      </tr>
      {talents.map((candidate, i) => candidate.candidates.map((talent, j) => {
        const potential = talent.requiredPotentialRank !== 0 ? " Potential" + talent.requiredPotentialRank.toString() : "";
        return (
          <tr key={`${i}-${j}`} className="divide-x divide-y divide-black">
            {j === 0 ? <th rowSpan={candidate.candidates.length}>{`Talent ${talent.prefabKey}`}</th> : ""}
            {j === 0 ? <td rowSpan={candidate.candidates.length}>{`${talent.name}`}</td> : ""}
            <td>{`E${getPromotion(talent.unlockCondition.phase)}` + potential}</td>
            <td>{talent.description}</td>
          </tr>
        );
      })
      )}
    </table>
  );
}

export default Talents;



