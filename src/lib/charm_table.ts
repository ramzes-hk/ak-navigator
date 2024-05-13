import path from "path";
import fs from "fs";
import { CharmTable, Charm } from "./charm_table_types";

export function getCharm(id: string): Charm | undefined {
  const fileName = path.join(process.cwd(), "operators", "charm_table.json");
  const raw = fs.readFileSync(fileName, "utf8");
  const table = JSON.parse(raw) as CharmTable;
  return table.charmList.find((charm) => charm.id === id);
}
