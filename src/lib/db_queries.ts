import { db } from "@/db/db";
import { operators } from "@/db/schema";
import { eq, like, notLike } from "drizzle-orm";

export async function getOpName(id: string): Promise<string> {
  const result = await db
    .select({ name: operators.name })
    .from(operators)
    .where(eq(operators.id, id));
  return result[0].name;
}

export async function getMenuData() {
  const result = await db
    .select({
      id: operators.id,
      name: operators.name,
      rarity: operators.rarity,
      profession: operators.profession,
      subProfessionId: operators.subProfessionId,
    })
    .from(operators)
    .where(like(operators.id, "%char%"));
  return result;
}

export async function getEntitiesMenuData() {
  const result = await db
    .select({
      id: operators.id,
      name: operators.name,
      rarity: operators.rarity,
      profession: operators.profession,
      subProfessionId: operators.subProfessionId,
    })
    .from(operators)
    .where(notLike(operators.id, "%char%"));
  return result;
}