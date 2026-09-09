import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  // Next.js loads .env.local itself; this only fires for standalone scripts
  // (e.g. scripts/seed.ts) run outside the Next.js process.
  try {
    process.loadEnvFile(".env.local");
  } catch {
    // no .env.local on disk (e.g. production) — DATABASE_URL must already be set
  }
}

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
