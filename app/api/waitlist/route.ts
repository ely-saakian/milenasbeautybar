import { getSql } from "@/lib/db";
import { parseSignup, type SignupResponse } from "@/lib/waitlist";

/**
 * POST /api/waitlist: save a waitlist signup. There is deliberately no GET;
 * Milena reads the list in Neon.
 *
 *   → { name, phone, service, website: "" }
 *   ← 201 { status: "created" }          new phone
 *   ← 200 { status: "already_listed" }   phone already saved; name/service updated
 *   ← 400 { status: "invalid", fields }  per-field messages
 *   ← 500 { status: "error" }            anything unexpected (details only in logs)
 */
export const runtime = "nodejs";

function reply(body: SignupResponse, status: number): Response {
  return Response.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ status: "invalid", fields: {} }, 400);
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
  } catch (error) {
    // Log the failure without the visitor's details; never echo it to the client.
    console.error(
      "waitlist signup failed:",
      error instanceof Error ? error.message : "unknown error"
    );
    return reply({ status: "error" }, 500);
  }
}
