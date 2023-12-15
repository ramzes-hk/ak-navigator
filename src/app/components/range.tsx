import { Range, getRange } from "@/lib/ranges";
import { Phase } from "@/lib/operators";

import CanvasRange from "./range_canvas";
interface rangeProp {
  phases: Phase[];
}


async function RangeGrid({phases}: rangeProp) {
  const ranges = await Promise.all(phases.map(async (phase) => await getRange(phase.rangeId)));
  function sizes(range: Range) {
    let minW = 0;
    let minH = 0;
    let maxW = 0;
    let maxH = 0;
    range.grids.forEach(grid => {
      if (grid.col < minW) minW = grid.col;
      if (grid.col > maxW) maxW = grid.col;
      if (grid.row < minH) minH = grid.row;
      if (grid.row > maxH) maxH = grid.row;
    })
    return [minW, minH, maxW, maxH];
  }
  
  return (
    <table className="border">
      <thead>
        <tr className="divide-x divide-y">
          {ranges.map((_, i) => <th key={i}>E{i}</th> )}
        </tr>
      </thead>
      <tbody>
        <tr className="divide-x divide-y border"> 
          {ranges.map((range, i) => <td key={i}><CanvasRange grid={range.grids} sizes={sizes(range)}/></td>)}
        </tr>
      </tbody>
    </table>
  ); 
}

export default RangeGrid;
