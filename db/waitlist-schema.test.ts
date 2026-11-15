import { describe, expect, it } from "vitest";
import { getSql } from "@/lib/db";

// Integration check against a real Neon branch (locally: the `dev` branch from
// .env.local). Skipped when DATABASE_URL is unset so CI without secrets stays green.
describe.skipIf(!process.env.DATABASE_URL)(
  "waitlist table (db/migrations/0001_create_waitlist.sql)",
  () => {
    it("has the expected columns, types, nullability and defaults", async () => {
      const columns = await getSql()`
        select column_name, data_type, is_nullable, column_default,
               is_identity, identity_generation
        from information_schema.columns
        where table_schema = 'public' and table_name = 'waitlist'
        order by ordinal_position`;

      expect(columns).toEqual([
        {
          column_name: "id",
          data_type: "bigint",
          is_nullable: "NO",
          column_default: null,
          is_identity: "YES",
          identity_generation: "ALWAYS",
        },
        {
          column_name: "name",
          data_type: "text",
          is_nullable: "NO",
          column_default: null,
          is_identity: "NO",
          identity_generation: null,
        },
        {
          column_name: "phone",
          data_type: "text",
          is_nullable: "NO",
          column_default: null,
          is_identity: "NO",
          identity_generation: null,
        },
        {
          column_name: "service",
          data_type: "text",
          is_nullable: "NO",
          column_default: "'General'::text",
          is_identity: "NO",
          identity_generation: null,
        },
        {
          column_name: "created_at",
          data_type: "timestamp with time zone",
          is_nullable: "YES",
          column_default: "now()",
          is_identity: "NO",
          identity_generation: null,
        },
        {
          column_name: "updated_at",
          data_type: "timestamp with time zone",
          is_nullable: "YES",
          column_default: "now()",
          is_identity: "NO",
          identity_generation: null,
        },
      ]);
    });

    it("has a primary key on id and a unique constraint on phone only", async () => {
      const constraints = await getSql()`
        select c.contype as type,
               array_agg(a.attname::text order by a.attname) as columns
        from pg_constraint c
        join pg_attribute a
          on a.attrelid = c.conrelid and a.attnum = any (c.conkey)
        where c.conrelid = 'public.waitlist'::regclass
          and c.contype in ('p', 'u')
        group by c.oid, c.contype
        order by c.contype`;

      expect(constraints).toEqual([
        { type: "p", columns: ["id"] },
        { type: "u", columns: ["phone"] },
      ]);
    });
  }
);
