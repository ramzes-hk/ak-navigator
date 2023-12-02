import { PotentialRank } from "@/lib/operators";

interface PotentialsProps {
  potentitalRanks: PotentialRank[];
}

function Potentials({ potentitalRanks }: PotentialsProps) {
  return (
    <>
      <table className="border border-collapse">
        <caption>Potentials</caption>
        <tbody>
          {potentitalRanks.map((potential, i) => {
            return (
              <tr key={i} className="divide-x divide-y">
                <th className="border">{`${i + 2}`}</th>
                <td>{potential.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {potentitalRanks.length === 0 && <p>No potentials available</p>}
    </>
  );
}

export default Potentials;
