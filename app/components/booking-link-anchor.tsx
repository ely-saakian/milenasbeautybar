"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useWaitlist } from "./waitlist/waitlist-provider";

type BookingLinkAnchorProps = ComponentPropsWithoutRef<"a"> & {
  service: string;
};

/**
 * The client half of BookingLink. Inside the WaitlistProvider (waitlist mode),
 * a click opens the waitlist form for this link's service instead of following
 * the href. Outside it (Acuity mode, see BookingModeProvider), before
 * hydration, or without JavaScript, it's a plain link to the Acuity URL.
 */
export function BookingLinkAnchor({
  service,
  onClick,
  ...rest
}: BookingLinkAnchorProps) {
  const waitlist = useWaitlist();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !waitlist || e.button !== 0) return;
    e.preventDefault();
    waitlist.openWaitlist({ service, trigger: e.currentTarget });
  };

  return <a {...rest} onClick={handleClick} />;
}
