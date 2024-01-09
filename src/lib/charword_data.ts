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

interface VoiceLangDict {
  wordkey: [string, ...string[]];
  charId: string;
  dict: {
    [key: string]: {
      wordkey: string;
      voiceLangType: string;
      cvName: string[];
      voicePath: unknown;
    };
  };
}

interface VoiceLangTypeDict {
  name: string;
  groupType: string;
}

interface CharwordTable {
  charWords: Record<string, CharwordChar>;
  voiceLangDict: Record<string, VoiceLangDict>;
  voiceLangTypeDict: Record<string, VoiceLangTypeDict>;
}

interface Charwords {
  charwordCharArr: CharwordChar[];
  voiceLang: VoiceLangDict;
  voiceLangTypeDict: CharwordTable["voiceLangTypeDict"];
}

export async function getCharword(charId: string): Promise<Charwords> {
  const fileName = path.join(process.cwd(), "operators", "charword_table.json");
  const raw = fs.readFileSync(fileName, "utf8");
  const content = JSON.parse(raw) as CharwordTable;

  const lineKeys = Object.keys(content.charWords).filter((key) =>
    key.includes(charId),
  );
  return {
    charwordCharArr: lineKeys.map((key) => content.charWords[key]),
    voiceLang: content.voiceLangDict["char_" + charId],
    voiceLangTypeDict: content.voiceLangTypeDict,
  };
}
