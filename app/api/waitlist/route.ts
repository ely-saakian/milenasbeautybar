import { getSql } from "@/lib/db";
import { isAllowedOrigin } from "@/lib/origin";
import {
  isHoneypotFilled,
  parseSignup,
  type RouteResponse,
} from "@/lib/waitlist";

/**
 * POST /api/waitlist: save a waitlist signup. There is deliberately no GET;
 * Milena reads the list in Neon.
 *
 *   → { name, phone, service, website: "" }
 *   ← 201 { status: "created" }          new phone (also faked, with nothing saved,
 *                                        when the `website` honeypot is filled)
 *   ← 200 { status: "already_listed" }   phone already saved; name/service updated
 *   ← 400 { status: "invalid", fields }  per-field messages
 *   ← 403 { status: "forbidden" }        Origin missing or not this site (lib/origin.ts)
 *   ← 500 { status: "error" }            anything unexpected (details only in logs)
 *
 * The Vercel Firewall also rate-limits this path (5 requests a minute per IP)
 * and answers 429 itself; that rule lives in the Vercel dashboard, not here.
 */
export const runtime = "nodejs";

function reply(body: RouteResponse, status: number): Response {
  return Response.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request.headers.get("origin")))
    return reply({ status: "forbidden" }, 403);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ status: "invalid", fields: {} }, 400);
  }

  // Before validation, so a bot gets the same answer whatever else it sent.
  // The fixed log line is there to spot false positives (e.g. autofill).
  if (isHoneypotFilled(body)) {
    console.warn("waitlist honeypot filled; nothing saved");
    return reply({ status: "created" }, 201);
  }

  const parsed = parseSignup(body);
  if (!parsed.ok)
    return reply({ status: "invalid", fields: parsed.fields }, 400);
  const { name, phone, service } = parsed.signup;

  try {
    const sql = getSql();
    // One statement: insert, or refresh the existing row for this phone.
    // xmax is 0 only on a freshly inserted row version, which tells the two apart.
    const rows = await sql`
      insert into waitlist (name, phone, service)
      values (${name}, ${phone}, ${service})
      on conflict (phone) do update
        set name = excluded.name,
            service = excluded.service,
            updated_at = now()
      returning (xmax = 0) as inserted`;
    const inserted = rows[0]?.inserted === true;
    return inserted
      ? reply({ status: "created" }, 201)
      : reply({ status: "already_listed" }, 200);
  } catch {
    // A fixed line: the error's message can name the database host, and the
    // visitor's details don't belong in logs. Never echo anything to the client.
    console.error("waitlist signup failed");
    return reply({ status: "error" }, 500);
  }
}
