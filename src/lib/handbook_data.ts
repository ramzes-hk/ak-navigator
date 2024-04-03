import path from "path";
import fs from "fs";

export interface HandbookChar {
  charID: string;
  infoName: string;
  isLimited: boolean;
  storyTextAudio: {
    stories: {
      storyText: string;
      unLockType: string;
      unLockParam: string;
      unLockString: string;
    }[];
    storyTitle: string;
    unLockorNot: boolean;
  }[];
}

interface HandbookInfo {
  handbookDict: {
    [charID: string]: HandbookChar;
  };
}

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
