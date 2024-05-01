import { Stage } from "@/lib/stage_table_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/table";

interface stageTableProps {
  stage: Stage;
}

function StageTable({ stage }: stageTableProps) {
  return (
    <Table className="w-full sm:w-3/4">
      <TableBody>
        <TableRow>
          <TableHead>AP</TableHead>
          <TableHead>AP Refund</TableHead>
          <TableHead>EXP</TableHead>
          <TableHead>LMD</TableHead>
          <TableHead>Req</TableHead>
        </TableRow>
        <TableRow>
          <TableCell>{stage.apCost}</TableCell>
          <TableCell>{stage.apFailReturn}</TableCell>
          <TableCell>{stage.expGain}</TableCell>
          <TableCell>{stage.goldGain}</TableCell>
          <TableCell>{stage.dangerLevel}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default StageTable;
