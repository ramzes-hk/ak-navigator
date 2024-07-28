import Database from "better-sqlite3";
import path from "path";
import * as schema from "@/db/schema";

import { drizzle } from "drizzle-orm/better-sqlite3";
const dbPath = path.join(process.cwd(), "db", "db.db");
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema: schema});
