import { getRange } from "@/lib/ranges";
import { Phase } from "@/lib/operators";
import CanvasRange from "./range_canvas";

interface rangeProp {
  phases: Phase[];
}

async function RangeGrid({ phases }: rangeProp) {
  const ranges = await Promise.all(
    phases.map(async (phase) => await getRange(phase.rangeId)),
  );

  return (
    <table className="border">
      <thead>
        <tr className="divide-x divide-y">
          {ranges.map((_, i) => (
            <th key={i}>E{i}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="divide-x divide-y border">
          {ranges.map((range, i) => (
            <td key={i} className="p-4">
              <CanvasRange range={range} />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default RangeGrid;
