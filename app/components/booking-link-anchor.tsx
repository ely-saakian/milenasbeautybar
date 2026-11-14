"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useWaitlist } from "./waitlist/waitlist-provider";

type BookingLinkAnchorProps = ComponentPropsWithoutRef<"a"> & {
  service: string;
};

/**
 * The client half of BookingLink. While booking is paused, a click opens the
 * waitlist form for this link's service instead of following the href. The
 * href stays the Acuity URL, so the link still works before hydration, without
 * JavaScript, or outside the WaitlistProvider.
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
