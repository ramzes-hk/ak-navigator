export interface ItemTable {
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
