import path from "path";
import { BuildingData, Furniture } from "./building_data_types";
import fs from "fs";

export function getFurniture(id: string): Furniture {
  const fileName = path.join(process.cwd(), "operators", "building_data.json");
  const data = fs.readFileSync(fileName, "utf8");
  const buildingData = JSON.parse(data) as BuildingData;
  const furn = buildingData.customData.furnitures[id];
  if (!furn) {
    throw new Error(`furniture not found ${id}`);
  }
  return furn;
}
