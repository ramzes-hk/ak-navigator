import fs from "fs";
import path from "path";

interface Char {
  charId: string;
  buffChar: {
    buffData: {
      buffId: string;
      cond: {
        phase: string;
        level: number;
      };
    }[];
  }[];
}

interface Buff {
  buffId: string;
  buffName: string;
  buffIcon: string;
  sortId: number;
  buffColor: string;
  textColor: string;
  buffCategory: string;
  roomType: string;
  description: string;
}

export type CharWithBuff = Char & {
  buffChar: {
    buffData: {
      buff: Buff;
    }[];
  }[];
};

interface BuildingData {
  chars: Record<string, Char>;
  buffs: Record<string, Buff>;
}

export async function getBaseSkills(id: string): Promise<CharWithBuff | null> {
  const fileName = path.join(process.cwd(), "operators", "building_data.json");
  const raw = fs.readFileSync(fileName, "utf8");
  const buildingData = JSON.parse(raw) as BuildingData;

  const charData = buildingData.chars[id];
  if (charData === undefined) return null;
  const buffData = buildingData.buffs;
  const out: CharWithBuff = {
    ...charData,
    buffChar: charData.buffChar.map((bc) => ({
      buffData: bc.buffData.map((b) => {
        const buff = buffData[b.buffId];
        if (!buff) {
          throw "No buff found";
        }
        return {
          ...b,
          buff: buff,
        };
      }),
    })),
  };
  return out;
}
