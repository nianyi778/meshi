import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export type DrizzleDB = ReturnType<typeof getDb>;

export function getDb() {
  // vinext exposes CF bindings via process.env OR getCloudflareContext
  // Try both patterns for compatibility
  let d1: unknown;

  // Pattern 1: direct env binding (wrangler dev / deployed)
  d1 = (process.env as unknown as Record<string, unknown>).DB;

  if (!d1) {
    throw new Error(
      "D1 binding 'DB' not found. Configure wrangler.toml and set database_id.",
    );
  }

  return drizzle(d1, { schema });
}
