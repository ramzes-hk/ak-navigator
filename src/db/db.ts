import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";

export const connection = createClient({
  url: process.env.TURSO_URL ?? "",
  authToken: process.env.TURSO_API_TOKEN,
});

export const db = drizzle(connection, { schema });
