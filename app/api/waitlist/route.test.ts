import { beforeEach, describe, expect, it, vi } from "vitest";
import { getSql } from "@/lib/db";
import { POST } from "./route";

// The database is the system boundary here: these tests always run, with a
// stand-in for Neon. route.db.test.ts runs the same route against the dev branch.
vi.mock("@/lib/db", () => ({ getSql: vi.fn() }));

/** A fake tagged-template SQL client that answers every query with `rows`. */
function fakeSql(rows: unknown[] | Error) {
  const sql = vi.fn(async () => {
    if (rows instanceof Error) throw rows;
    return rows;
  });
  vi.mocked(getSql).mockReturnValue(
    sql as unknown as ReturnType<typeof getSql>
  );
  return sql;
}

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

const signup = {
  name: "Sarah Kim",
  phone: "(253) 555-0147",
  service: "Lash Lift",
  website: "",
};

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.mocked(getSql).mockReset();
  });

  it("saves a new signup and answers 201 created", async () => {
    fakeSql([{ inserted: true }]);

    const res = await post(signup);

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ status: "created" });
  });

  it("tells a returning phone it is already listed", async () => {
    fakeSql([{ inserted: false }]);

    const res = await post(signup);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "already_listed" });
  });

  it("rejects an invalid phone and a blank name with per-field messages", async () => {
    const sql = fakeSql([{ inserted: true }]);

    const res = await post({ ...signup, name: "   ", phone: "253 555 01" });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      status: "invalid",
      fields: {
        name: "Please enter your name.",
        phone: "Enter a 10-digit US mobile number.",
      },
    });
    expect(sql).not.toHaveBeenCalled();
  });

  it("rejects a body that isn't JSON", async () => {
    fakeSql([{ inserted: true }]);

    const res = await post("name=Sarah");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ status: "invalid", fields: {} });
  });

  it("answers a bare 500 error without leaking what went wrong", async () => {
    fakeSql(new Error("connection to ep-secret-host refused"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await post(signup);

    expect(res.status).toBe(500);
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({ status: "error" });
    expect(text).not.toContain("ep-secret-host");
  });

  it("answers 500 when the database isn't configured", async () => {
    vi.mocked(getSql).mockImplementation(() => {
      throw new Error("DATABASE_URL is not set.");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await post(signup);

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ status: "error" });
  });
});
