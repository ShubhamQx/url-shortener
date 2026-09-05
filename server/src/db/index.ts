import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

const db = drizzle({ client: pool });

const checkDBStatus = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("DB connection failed \n", err);
    process.exit(1);
  }
};

export { db, checkDBStatus };