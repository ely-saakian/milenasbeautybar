import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { getSql } from "@/lib/db";
import { POST } from "./route";

// Runs the route against a real Neon branch (locally: `dev`, from .env.local).
// Skipped without DATABASE_URL. Only uses fictional 555-01xx numbers and
// "TEST …" names, and deletes exactly those rows afterwards.
const PHONE = "+15555550147";

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/waitlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify(body),
    })
  );
}

async function rowsFor(phone: string) {
  return getSql()`
    select name, phone, service from waitlist where phone = ${phone}`;
}

describe.skipIf(!process.env.DATABASE_URL)(
  "POST /api/waitlist against the database",
  () => {
    const cleanUp = async () => {
      await getSql()`
        delete from waitlist where phone = ${PHONE} and trim(name) like 'TEST %'`;
    };
    beforeAll(cleanUp);
    afterAll(cleanUp);

    it("inserts one normalised row for a new phone and answers created", async () => {
      const res = await post({
        name: "  TEST Route Created ",
        phone: "(555) 555-0147",
        service: "Lash Lift",
        website: "",
      });

      expect(res.status).toBe(201);
      expect(await res.json()).toEqual({ status: "created" });
      expect(await rowsFor(PHONE)).toEqual([
        { name: "TEST Route Created", phone: PHONE, service: "Lash Lift" },
      ]);
    });

    it("updates the existing row when the same phone signs up again", async () => {
      const res = await post({
        name: "TEST Route Again",
        phone: "555.555.0147",
        service: "Brow Lamination",
        website: "",
      });

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ status: "already_listed" });
      expect(await rowsFor(PHONE)).toEqual([
        { name: "TEST Route Again", phone: PHONE, service: "Brow Lamination" },
      ]);
    });
  }
);
