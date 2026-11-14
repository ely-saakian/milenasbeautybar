import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type Sql = NeonQueryFunction<false, false>;

let sql: Sql | undefined;

/**
 * The Neon SQL client for the waitlist database, created on first use so that
 * builds and pages that never touch the database don't need DATABASE_URL.
 *
 * Use it as a tagged template; values are sent as parameters, never spliced in:
 *   const rows = await getSql()`select * from waitlist where phone = ${phone}`;
 */
export function getSql(): Sql {
  if (sql) return sql;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Locally, put the Neon dev branch pooled URL in .env.local (see .env.example); on Vercel it comes from the Neon integration."
    );
  }
  sql = neon(url);
  return sql;
}
