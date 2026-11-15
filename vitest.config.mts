import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";
import { defineConfig } from "vitest/config";

/**
 * DATABASE_URL for the DB integration tests: a real environment variable wins,
 * otherwise it's read from .env.local (the Neon dev branch). Only that one key
 * is taken. Without it, the DB tests skip themselves.
 */
function databaseUrl(): string | undefined {
  if (process.env.DATABASE_URL !== undefined) return process.env.DATABASE_URL;
  try {
    return parseEnv(readFileSync(".env.local", "utf8")).DATABASE_URL;
  } catch {
    return undefined;
  }
}

const DATABASE_URL = databaseUrl();

export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      // Vitest isn't a React Server environment, so the guard would throw;
      // use the package's own no-op entry instead.
      "server-only": fileURLToPath(
        new URL("./node_modules/server-only/empty.js", import.meta.url)
      ),
    },
  },
  test: {
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "public/**"],
    env: DATABASE_URL ? { DATABASE_URL } : {},
  },
});
