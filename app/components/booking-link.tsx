import type { ComponentPropsWithoutRef } from "react";
import { GENERAL_SERVICE } from "@/lib/waitlist";
import { BookingLinkAnchor } from "./booking-link-anchor";

/** Acuity scheduler for general bookings (nav, hero, footer). */
export const GENERAL_BOOKING_URL =
  "https://milenasbeautybar.as.me/schedule/13baf9e3";

/** Acuity appointment type for a free consultation (FAQ section). */
export const CONSULTATION_BOOKING_URL =
  "https://milenasbeautybar.as.me/?appointmentType=83824594";

export type BookingLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "target" | "rel"
> & {
  /** The service this link books, e.g. "Lash Lift". Defaults to "General". */
  service?: string;
  /** Acuity URL for this service (often from TinaCMS). Defaults to the general scheduler. */
  href?: string;
};

/**
 * The single place every "Book" link on the site goes through. In waitlist
 * mode (TinaCMS → Booking → Mode), clicking one opens the waitlist form for
 * its service (see BookingLinkAnchor and BookingModeProvider). In Acuity mode
 * there's no waitlist to open, so it's a plain link. Either way the href is
 * the Acuity URL, in a new tab, which is also the no-JavaScript fallback.
 */
export function BookingLink({
  service = GENERAL_SERVICE,
  href = GENERAL_BOOKING_URL,
  ...rest
}: BookingLinkProps) {
  // The service travels with the click, not the DOM, so the markup stays the same.
  return (
    <BookingLinkAnchor
      service={service}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    />
  );
}
