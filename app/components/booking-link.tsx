import type { ComponentPropsWithoutRef } from "react";

/** Service name used for "Book" links that aren't tied to a specific service. */
export const GENERAL_SERVICE = "General";

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
 * The single place every "Book" link on the site goes through. Today it opens
 * Acuity in a new tab; later it decides per service whether to book or waitlist.
 */
export function BookingLink({
  service = GENERAL_SERVICE,
  href = GENERAL_BOOKING_URL,
  ...rest
}: BookingLinkProps) {
  // Not used yet; kept off the DOM. The waitlist slices use it to pick the service.
  void service;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />;
}
