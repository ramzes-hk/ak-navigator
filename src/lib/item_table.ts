import path from "path";
import fs from "fs";
import { LvlUpCost } from "./operators_types";

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

async function getItemTable() {
  const fileName = path.join(process.cwd(), "operators", "item_table.json");
  const raw = await fs.promises.readFile(fileName, "utf8");
  return JSON.parse(raw) as ItemTable;
}

export async function getItem(itemId: string): Promise<Item> {
  const content = await getItemTable();
  return content.items[itemId];
}

export async function getItemBatch(cost: LvlUpCost[]): Promise<Item[]> {
  const content = await getItemTable();
  const mats = cost.map((mat) => content.items[mat.id]);
  return mats;
}
