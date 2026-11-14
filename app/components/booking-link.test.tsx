import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BookingLink } from "./booking-link";

/** Render to HTML and read one attribute off the anchor (no DOM env needed). */
function anchorAttr(ui: ReactElement, name: string): string | null {
  const html = renderToStaticMarkup(ui);
  const m = html.match(new RegExp(`<a[^>]*\\s${name}="([^"]*)"`));
  return m ? m[1].replace(/&amp;/g, "&") : null;
}

describe("BookingLink", () => {
  it("links a general booking to the main Acuity scheduler", () => {
    expect(
      anchorAttr(<BookingLink>Book an Appointment</BookingLink>, "href")
    ).toBe("https://milenasbeautybar.as.me/schedule/13baf9e3");
  });

  it("opens Acuity in a new tab without leaking the opener", () => {
    const ui = <BookingLink>Book an Appointment</BookingLink>;
    expect(anchorAttr(ui, "target")).toBe("_blank");
    expect(anchorAttr(ui, "rel")).toBe("noopener noreferrer");
  });

  it("keeps a service's own Acuity link from the CMS", () => {
    const cmsHref = "https://milenasbeautybar.as.me/?appointmentType=12345";
    expect(
      anchorAttr(
        <BookingLink service="Lash Lift" href={cmsHref}>
          Book Lash Lift
        </BookingLink>,
        "href"
      )
    ).toBe(cmsHref);
  });

  it("renders the same markup whatever service it is for", () => {
    const general = renderToStaticMarkup(<BookingLink>Book</BookingLink>);
    expect(
      renderToStaticMarkup(<BookingLink service="Lash Lift">Book</BookingLink>)
    ).toBe(general);
  });
});
