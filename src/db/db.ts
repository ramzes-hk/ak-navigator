import postgres from "postgres";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";

export const connection = postgres(process.env.DB as string);

export const db = drizzle(connection, { schema });
