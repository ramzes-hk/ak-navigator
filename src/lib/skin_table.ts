import fs from "fs";
import path from "path";

export interface CharSkin {
  portraitId: string;
  displaySkin: {
    skinName: string | null;
    drawerList: string[] | null;
    content: string | null;
    skinGroupId: string | null;
  };
}

interface SkinTable {
  charSkins: {
    [skinId: string]: CharSkin;
  };
}

export async function getPortraitId(charId: string): Promise<CharSkin[]> {
  const fileName = path.join(process.cwd(), "operators", "skin_table.json");
  const raw = fs.readFileSync(fileName, "utf8");
  const content = JSON.parse(raw) as SkinTable;

  const ids = Object.keys(content.charSkins).filter((key) =>
    key.includes(charId),
  );
  return ids.map((id) => content.charSkins[id]);
}
