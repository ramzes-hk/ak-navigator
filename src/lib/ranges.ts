import path from "path";
import fs from "fs";

export interface Range {
  id: string;
  direction: number;
  grids: {
    row: number;
    col: number;
  }[];
}

type Ranges = Record<string, Range>;

export async function getRange(id: string): Promise<Range> {
  const fileName = path.join(process.cwd(), "operators", "range_table.json");
  const rawFile = fs.readFileSync(fileName, "utf8");
  const contents = JSON.parse(rawFile) as Ranges;
  const range = contents[id];
  if (!range) {
    throw "No range found";
  }
  return range;
}
