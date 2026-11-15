/**
 * Google Analytics events. GA is only loaded in production when
 * NEXT_PUBLIC_GA_ID is set (see app/layout.tsx), so every call is a no-op
 * otherwise. Never pass personal details (names, phone numbers) as params.
 */

type Gtag = (
  command: "event",
  name: string,
  params?: Record<string, string | number | boolean>
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  try {
    window.gtag("event", name, params);
  } catch {
    // Analytics must never break the page.
  }
}
