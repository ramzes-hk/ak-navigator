import path from "path";
import fs from "fs";

interface ItemTable {
  items: Record<string, Item>;
}

export interface Item {
  itemId: string;
  name: string;
  description: string;
  rarity: string;
  iconId: string;
  overrideBkg: any;
  stackIconId: string | null;
  sortId: number;
  usage: string;
  obtainApproach: string;
  hideInItemGet: boolean;
  classifyType: string;
  itemType: string;
  stageDropList: Stage[];
  buildingProductList: BuildingProduct[];
}

interface Stage {
  stageId: string;
  occPer: string;
}

interface BuildingProduct {
  roomType: string;
  formulaId: string;
}

export async function getItem(itemId: string): Promise<Item> {
  const fileName = path.join(process.cwd(), "operators", "item_table.json");
  const raw = await fs.promises.readFile(fileName, "utf8");
  const content = JSON.parse(raw) as ItemTable;

  return content.items[itemId];
}
