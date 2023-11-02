import { PotentialRank } from "@/components/lib/operators";

interface PotentialsProps {
  potentitalRanks: PotentialRank[];
}

function Potentials({ potentitalRanks }: PotentialsProps) {
  return (
    <table className="border border-collapse border-black">
      <caption>Potentials</caption>
      <tbody>
        {potentitalRanks.map((potential, i) => {
          return (
            <tr key={i} className="divide-x divide-y divide-black">
              <th className="border border-black">{`P${i + 2}`}</th>
              <td>{potential.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Potentials;