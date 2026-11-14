import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import {
  bookingModeFromMarkdown,
  DEFAULT_BOOKING_MODE,
  type BookingMode,
} from "./booking-mode";

/**
 * The booking mode Milena picked in TinaCMS (Booking → Mode), read from the
 * committed content file at build time. Falls back to the waitlist if the
 * file is missing or unreadable. Cached per render, so the layout and the
 * banner share one read.
 *
 * Read from disk rather than through the Tina client: pages are prerendered,
 * and Next keeps build-time fetch responses in `.next/cache`, which Vercel
 * restores on the next build. A cached query could keep the old mode after
 * Tina commits a change; the file in the deployed commit can't.
 */
export const getBookingMode = cache(async (): Promise<BookingMode> => {
  try {
    const source = await readFile(
      path.join(process.cwd(), "content/booking/booking.md"),
      "utf8"
    );
    return bookingModeFromMarkdown(source);
  } catch {
    return DEFAULT_BOOKING_MODE;
  }
});
