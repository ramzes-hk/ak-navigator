import path from "path";
import fs from "fs";

interface CharwordChar {
  charWordId: string;
  wordKey: string;
  charId: string;
  voiceId: string;
  voiceText: string;
  voiceTitle: string;
  voiceIndex: number;
  voiceType: string;
  unlockType: string;
  unlockParam: {
    valueStr: string | null;
    valueInt: number;
  }[];
  placeType: string;
  voiceAsset: string;
}

interface CharwordTable {
  charWords: {
    [charId: string]: CharwordChar;
  };
}

export async function getCharword(charId: string): Promise<CharwordChar[]> {
  const fileName = path.join(process.cwd(), "operators", "charword_table.json");
  const raw = fs.readFileSync(fileName, "utf8");
  const content = JSON.parse(raw) as CharwordTable;

  const lineKeys = Object.keys(content.charWords).filter((key) =>
    key.includes(charId),
  );
  return lineKeys.map((key) => content.charWords[key]);
}
