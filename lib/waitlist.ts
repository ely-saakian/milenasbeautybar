import { normalizeUsPhone, PHONE_ERROR } from "./phone";

/**
 * The waitlist signup contract, shared by the form (browser) and the route
 * handler (server). See app/api/waitlist/route.ts.
 */

/** Service name for signups that aren't tied to a specific service. */
export const GENERAL_SERVICE = "General";

export const NAME_MAX = 100;
export const SERVICE_MAX = 100;

export const NAME_ERROR = "Please enter your name.";

/** What the browser posts. `website` is a honeypot and is always "" for people. */
export type SignupRequest = {
  name: string;
  phone: string;
  service: string;
  website: string;
};

export type SignupField = "name" | "phone";
export type FieldErrors = Partial<Record<SignupField, string>>;

/** Every response body the route can send. */
export type SignupResponse =
  | { status: "created" }
  | { status: "already_listed" }
  | { status: "invalid"; fields: FieldErrors }
  | { status: "error" };

/** A signup that passed validation, ready to store. */
export type Signup = {
  name: string;
  /** E.164, `+1XXXXXXXXXX`. */
  phone: string;
  service: string;
};

export type ParseResult =
  | { ok: true; signup: Signup }
  | { ok: false; fields: FieldErrors };

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validate and normalise a signup from untrusted input. The name is trimmed and
 * capped, the phone normalised to E.164, and the service trimmed, capped and
 * defaulted to "General". Unknown fields are ignored.
 */
export function parseSignup(input: unknown): ParseResult {
  const body = (input && typeof input === "object" ? input : {}) as Record<
    string,
    unknown
  >;

  const name = text(body.name).slice(0, NAME_MAX);
  const phone = normalizeUsPhone(text(body.phone));
  const service = text(body.service).slice(0, SERVICE_MAX) || GENERAL_SERVICE;

  const fields: FieldErrors = {};
  if (!name) fields.name = NAME_ERROR;
  if (!phone) fields.phone = PHONE_ERROR;

  if (!name || !phone) return { ok: false, fields };
  return { ok: true, signup: { name, phone, service } };
}

/** The visitor's first name, for "You're on the list, {first name}". */
export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? "";
}
