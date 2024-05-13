import { db } from "./db";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

async function main() {
  // This will run migrations on the database, skipping the ones already applied
  migrate(db, { migrationsFolder: "./drizzle/migrations" });

  // Don't forget to close the connection, otherwise the script will hang
}

main();
