import { db } from "@/db/db";
import { enemies } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: {params: { id: string }}) {
	const result = await db.select().from(enemies).where(eq(enemies.id, params.id));
	return result;
}
