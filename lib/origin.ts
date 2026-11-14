/**
 * Which `Origin`s may POST to the site's own API routes. A light check against
 * other sites (and scripts that don't bother to fake the header) posting forms;
 * the Vercel Firewall rate limit is the other half.
 */

/** The production domain; the site is served on both. */
const PRODUCTION_ORIGINS = [
  "https://milenasbeautybar.com",
  "https://www.milenasbeautybar.com",
];

/** Hostnames (no scheme) Vercel sets for the current deployment. */
const VERCEL_HOST_VARS = [
  "VERCEL_URL",
  "VERCEL_BRANCH_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
] as const;

type OriginEnv = Partial<
  Record<"NODE_ENV" | (typeof VERCEL_HOST_VARS)[number], string>
>;

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

/**
 * True when `origin` (the request's `Origin` header, or null when it has none)
 * is the site itself: the production domain, this Vercel deployment's own URLs,
 * or, outside production, `http://localhost` / `http://127.0.0.1` on any port.
 * A missing or opaque ("null") origin is not allowed.
 */
export function isAllowedOrigin(
  origin: string | null,
  env: OriginEnv = process.env
): boolean {
  if (!origin) return false;
  if (PRODUCTION_ORIGINS.includes(origin)) return true;

  for (const name of VERCEL_HOST_VARS) {
    const host = env[name];
    if (host && origin === `https://${host}`) return true;
  }

  if (env.NODE_ENV !== "production") {
    try {
      const url = new URL(origin);
      return (
        url.protocol === "http:" &&
        LOCAL_HOSTS.has(url.hostname) &&
        url.origin === origin
      );
    } catch {
      return false;
    }
  }
  return false;
}
