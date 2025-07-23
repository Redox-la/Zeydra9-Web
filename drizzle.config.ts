import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./shared",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "db.kbjidmeyiumqhgqoehnp.supabase.co",
    port: 5432,
    user: "postgres",
    password: "E5vguu7m#myE+J+",
    database: "postgres",
    ssl: true, // Optional: enable if required by host
  },
} satisfies Config;