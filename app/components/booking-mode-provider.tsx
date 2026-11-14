import type { ReactNode } from "react";
import type { BookingMode } from "@/lib/booking-mode";
import { WaitlistProvider } from "./waitlist/waitlist-provider";

/**
 * The site-wide booking switch, mounted once in the root layout with the mode
 * from TinaCMS. In waitlist mode it mounts WaitlistProvider, so Book links
 * open the waitlist form and /#waitlist works. In Acuity mode there is no
 * waitlist at all: Book links are plain links to Acuity (see
 * BookingLinkAnchor) and #waitlist does nothing.
 */
export function BookingModeProvider({
  mode,
  children,
}: {
  mode: BookingMode;
  children: ReactNode;
}) {
  if (mode === "acuity") return children;
  return <WaitlistProvider>{children}</WaitlistProvider>;
}
