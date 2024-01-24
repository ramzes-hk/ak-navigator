import { getRange } from "@/lib/ranges";
import { Phase } from "@/lib/operators";
import CanvasRange from "./range_canvas";

interface rangeProp {
  phases: Phase[];
}

async function RangeGrid({ phases }: rangeProp) {
  const ids = phases.map(phase => phase.rangeId).filter((id): id is string => id !== null);
  const ranges = await Promise.all(
    ids.map(async (id) => await getRange(id)),
  );
  if (ranges.length === 0) return null;
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
              <CanvasRange range={range}>
                <p>Operator Range at E{i}</p>
              </CanvasRange>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default RangeGrid;
