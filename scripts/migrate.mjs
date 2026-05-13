import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const db = drizzle(pool);

    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations complete");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Migration failed:", err?.cause ? err.cause.message || err.cause : err.message || err);
  process.exit(1);
});
