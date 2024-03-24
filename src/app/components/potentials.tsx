import { PotentialRank } from "@/lib/operators_types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/table";
interface PotentialsProps {
  potentialRanks: PotentialRank[];
}

function Potentials({ potentialRanks }: PotentialsProps) {
  if (potentialRanks.length === 0) return <p>No potentials available</p>;
  return (
    <Table className="w-full sm:w-1/2 table-fixed">
      <TableBody>
        {potentialRanks.map((potential, i) => {
          return (
            <TableRow key={i}>
              <TableHead className="text-center w-12">{`${i + 2}`}</TableHead>
              <TableCell>{potential.description}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default Potentials;
