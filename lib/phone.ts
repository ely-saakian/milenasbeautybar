/**
 * US mobile numbers for the waitlist. This one module is used by both the
 * browser (the form) and the server (the route handler), so they always agree.
 *
 * Rule: exactly 10 US digits, optionally with a leading 1 (or +1), with any of
 * the usual formatting characters (spaces, dots, dashes, parentheses). Letters,
 * extensions and other characters are rejected.
 */

/** Shown under the phone field when the number isn't valid. */
export const PHONE_ERROR = "Enter a 10-digit US mobile number.";

/**
 * Normalise a US mobile number to E.164 (`+1XXXXXXXXXX`), or return null if it
 * isn't one.
 */
export function normalizeUsPhone(input: string): string | null {
  // Digits and formatting only; a "+" may only lead (as in +1).
  if (!/^\s*\+?[\d\s().-]*$/.test(input)) return null;
  const digits = input.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return digits.length === 10 ? `+1${digits}` : null;
}

/**
 * Display a number as `(253) 555-0147`. Accepts E.164 or anything the visitor
 * typed; a number that isn't valid is returned unchanged.
 */
export function formatUsPhone(input: string): string {
  const e164 = normalizeUsPhone(input);
  if (!e164) return input;
  const d = e164.slice(2);
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
