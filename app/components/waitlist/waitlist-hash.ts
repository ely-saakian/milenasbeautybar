/**
 * The shareable link that opens the waitlist form on any page, e.g.
 * milenasbeautybar.com/#waitlist. No element has this id, so the browser has
 * nothing to scroll to; WaitlistProvider watches for it instead.
 */
export const WAITLIST_HASH = "#waitlist";

/** True when a `location.hash` is the waitlist link. */
export function isWaitlistHash(hash: string): boolean {
  return hash === WAITLIST_HASH;
}

type PageLocation = Pick<Location, "pathname" | "search" | "hash">;

/**
 * The URL to `history.replaceState` to once the form closes, so Back doesn't
 * reopen it and visiting /#waitlist again does. Null when the hash isn't the
 * waitlist link, meaning leave the URL alone.
 */
export function urlWithoutWaitlistHash(location: PageLocation): string | null {
  if (!isWaitlistHash(location.hash)) return null;
  return location.pathname + location.search;
}
