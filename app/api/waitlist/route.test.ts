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

/** POST `body` from `origin` (Vitest isn't production, so localhost is the site). */
function post(body: unknown, origin: string | null = "http://localhost:3000") {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (origin !== null) headers.origin = origin;
  return POST(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers,
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
    vi.restoreAllMocks();
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

  it("points a blank name at the name field only", async () => {
    const sql = fakeSql([{ inserted: true }]);

    const res = await post({ ...signup, name: "" });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      status: "invalid",
      fields: { name: "Please enter your name." },
    });
    expect(sql).not.toHaveBeenCalled();
  });

  it("points a bad phone at the phone field only", async () => {
    const sql = fakeSql([{ inserted: true }]);

    const res = await post({ ...signup, phone: "253-555-0147 ext 2" });

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      status: "invalid",
      fields: { phone: "Enter a 10-digit US mobile number." },
    });
    expect(sql).not.toHaveBeenCalled();
  });

  it("treats missing fields as blank", async () => {
    fakeSql([{ inserted: true }]);

    const res = await post({});

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      status: "invalid",
      fields: {
        name: "Please enter your name.",
        phone: "Enter a 10-digit US mobile number.",
      },
    });
  });

  it("rejects a body that isn't JSON", async () => {
    fakeSql([{ inserted: true }]);

    const res = await post("name=Sarah");

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ status: "invalid", fields: {} });
  });

  it("answers a bare 500 error without leaking what went wrong", async () => {
    fakeSql(new Error("connection to ep-secret-host refused"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await post(signup);

    expect(res.status).toBe(500);
    const text = await res.text();
    expect(JSON.parse(text)).toEqual({ status: "error" });
    expect(text).not.toContain("ep-secret-host");
    // The log line is fixed too: no connection details, no visitor details.
    expect(log).toHaveBeenCalledWith("waitlist signup failed");
    const logged = JSON.stringify(log.mock.calls);
    expect(logged).not.toContain("ep-secret-host");
    expect(logged).not.toContain("Sarah");
    expect(logged).not.toContain("555");
  });

  it("answers a filled honeypot with a fake created and saves nothing", async () => {
    const sql = fakeSql([{ inserted: true }]);
    const log = vi.spyOn(console, "warn").mockImplementation(() => {});

    const res = await post({ ...signup, website: "https://spam.example" });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ status: "created" });
    expect(sql).not.toHaveBeenCalled();
    expect(getSql).not.toHaveBeenCalled();
    // A fixed line, so false positives show up without logging what was sent.
    expect(log).toHaveBeenCalledWith("waitlist honeypot filled; nothing saved");
  });

  it("checks the honeypot before validating, so a bot learns nothing", async () => {
    const sql = fakeSql([{ inserted: true }]);

    vi.spyOn(console, "warn").mockImplementation(() => {});

    const res = await post({ name: "", phone: "nope", website: "x" });

    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ status: "created" });
    expect(sql).not.toHaveBeenCalled();
  });

  it("refuses a post from another site and saves nothing", async () => {
    const sql = fakeSql([{ inserted: true }]);

    const res = await post(signup, "https://evil.example");

    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ status: "forbidden" });
    expect(sql).not.toHaveBeenCalled();
    expect(getSql).not.toHaveBeenCalled();
  });

  it("refuses a post with no Origin and saves nothing", async () => {
    const sql = fakeSql([{ inserted: true }]);

    const res = await post(signup, null);

    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({ status: "forbidden" });
    expect(sql).not.toHaveBeenCalled();
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
