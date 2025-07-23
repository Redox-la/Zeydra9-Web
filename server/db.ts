// db.ts

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { schema } from "./shared/schema";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in your .env file.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // For Supabase or secure Postgres
  },
});

export const db = drizzle(pool, { schema });