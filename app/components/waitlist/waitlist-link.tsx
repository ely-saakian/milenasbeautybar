"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { WAITLIST_HASH } from "./waitlist-hash";
import { useWaitlist } from "./waitlist-provider";

type WaitlistLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href">;

/**
 * A link that opens the waitlist form (service "General"). A click opens it
 * directly, without touching the URL, and focus comes back here on close. The
 * href is the shareable #waitlist link, so a click before hydration still
 * opens the form once WaitlistProvider mounts and sees the hash.
 */
export function WaitlistLink({ onClick, ...rest }: WaitlistLinkProps) {
  const waitlist = useWaitlist();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !waitlist || e.button !== 0) return;
    // Cmd/Ctrl/Shift-click: let the browser open /#waitlist in a new tab or
    // window, where the provider opens the form on load.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    waitlist.openWaitlist({ trigger: e.currentTarget });
  };

  return <a {...rest} href={WAITLIST_HASH} onClick={handleClick} />;
}
