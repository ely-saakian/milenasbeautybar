import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { BookingMode } from "@/lib/booking-mode";
import { BookingLink } from "./booking-link";
import { BookingModeProvider } from "./booking-mode-provider";
import { useWaitlist } from "./waitlist/waitlist-provider";

const LASH_LIFT_URL = "https://milenasbeautybar.as.me/?appointmentType=12345";

function renderIn(mode: BookingMode, ui: ReactElement) {
  return renderToStaticMarkup(
    <BookingModeProvider mode={mode}>{ui}</BookingModeProvider>
  );
}

const bookLink = (
  <BookingLink service="Lash Lift" href={LASH_LIFT_URL}>
    Book Lash Lift
  </BookingLink>
);

/** The opening tag of the first anchor. */
const anchorTag = (html: string) => html.match(/<a\b[^>]*>/)?.[0] ?? "";

/** Renders "open" when a click on a Book link would open the waitlist. */
function WaitlistProbe() {
  return useWaitlist() ? "open" : "none";
}

describe("BookingModeProvider in Acuity mode", () => {
  it("renders Book links as plain links to their Acuity URL in a new tab", () => {
    expect(anchorTag(renderIn("acuity", bookLink))).toBe(
      `<a href="${LASH_LIFT_URL.replace(/&/g, "&amp;")}" target="_blank" rel="noopener noreferrer">`
    );
  });

  it("gives Book links no waitlist to open, so clicks follow the link", () => {
    expect(renderIn("acuity", <WaitlistProbe />)).toBe("none");
  });

  it("doesn't mount the waitlist form at all", () => {
    expect(renderIn("acuity", bookLink)).not.toContain("<dialog");
  });
});

describe("BookingModeProvider in waitlist mode", () => {
  it("keeps the same Book link markup as the no-JavaScript fallback", () => {
    expect(anchorTag(renderIn("waitlist", bookLink))).toBe(
      anchorTag(renderIn("acuity", bookLink))
    );
  });

  it("lets Book links open the waitlist form", () => {
    expect(renderIn("waitlist", <WaitlistProbe />)).toContain("open");
    expect(renderIn("waitlist", bookLink)).toContain("<dialog");
  });
});
