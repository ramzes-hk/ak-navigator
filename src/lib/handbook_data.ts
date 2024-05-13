import path from "path";
import fs from "fs";
import { HandbookChar, HandbookInfo } from "./handbook_data_types";

export async function getHandbook(
  charID: string,
): Promise<HandbookChar | undefined> {
  const fileName = path.join(
    process.cwd(),
    "operators",
    "handbook_info_table.json",
  );
  const raw = fs.readFileSync(fileName, "utf8");
  const handbook = JSON.parse(raw) as HandbookInfo;
  const handbookDict = handbook.handbookDict[charID];
  return handbookDict;
}
