/**
 * Where the site's Book links go, switched by Milena in TinaCMS (Booking →
 * Mode). See tina/config.ts and content/booking/booking.md.
 *
 * - "waitlist": every Book link opens the waitlist form.
 * - "acuity": Book links go straight to their Acuity URL.
 */
export type BookingMode = "waitlist" | "acuity";

/** The choices in TinaCMS (Booking → Mode). */
export const BOOKING_MODE_OPTIONS: { value: BookingMode; label: string }[] = [
  { value: "waitlist", label: "Waitlist" },
  { value: "acuity", label: "Acuity" },
];

/** Used when the TinaCMS value is missing or not one we know. */
export const DEFAULT_BOOKING_MODE: BookingMode = "waitlist";

/** The mode for a raw TinaCMS value, falling back to the waitlist. */
export function resolveBookingMode(value: unknown): BookingMode {
  return (
    BOOKING_MODE_OPTIONS.find((option) => option.value === value)?.value ??
    DEFAULT_BOOKING_MODE
  );
}

/**
 * The mode in a Booking entry as TinaCMS saves it (YAML front matter, e.g.
 * `mode: acuity`), falling back to the waitlist.
 */
export function bookingModeFromMarkdown(source: string): BookingMode {
  const frontMatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  const value = frontMatter.match(
    /^mode:\s*(["']?)([^"'\s#]*)\1\s*(?:#.*)?$/m
  )?.[2];
  return resolveBookingMode(value);
}
