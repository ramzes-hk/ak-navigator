import { db, connection } from "./db";
import { migrate } from "drizzle-orm/libsql/migrator";

async function main() {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: "./drizzle/migrations" });

  // Don't forget to close the connection, otherwise the script will hang
  connection.close();
}

main();
