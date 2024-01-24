import { getAllOpData } from "@/lib/operators";
import { db } from "./db";
import { operators } from "./schema";

async function populate_operators() {
  const opData = await getAllOpData(true);
  console.log(opData);
  // for (const op of opData) {
  //   await db.insert(operators).values({
  //     id: op.id ?? op.name,
  //     name: op.name,
  //     description: op.description,
  //     position: op.position,
  //     rarity: op.rarity,
  //     profession: op.profession,
  //     subProfessionId: op.subProfessionId,
  //   });
  // }
}
populate_operators();
