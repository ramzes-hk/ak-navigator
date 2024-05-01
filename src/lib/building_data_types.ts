export interface BuildingData {
  customData: {
    furnitures: Record<string, Furniture>;
  };
}

export interface Furniture {
  id: string;
  sortId: number;
  name: string;
  iconId: string;
  interactType: string;
  musicId: string;
  type: string;
  subType: string;
  location: string;
  category: string;
  validOnRotate: boolean;
  enableRotate: boolean;
  rarity: number;
  themeId: string;
  groupId: string;
  width: number;
  depth: number;
  height: number;
  comfort: number;
  usage: string;
  description: string;
  obtainApproach: string;
  processedProductId: string;
  processedProductCount: number;
  processedByProductPercentage: number;
  processedByProductGroup: [];
  canBeDestroy: boolean;
  isOnly: number;
  quantity: number;
}
