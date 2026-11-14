import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PromoBannerView } from "./promo-banner-view";

const MESSAGE = "♡ CURRENTLY NOT ACCEPTING CLIENTS ♡ On Maternity Leave ♡";

function render(props: { waitlistLink: boolean }) {
  return renderToStaticMarkup(
    <PromoBannerView {...props}>
      <span>{MESSAGE}</span>
    </PromoBannerView>
  );
}

/** The anchor whose text is the waitlist call to action, or undefined. */
function waitlistAnchor(html: string) {
  return html.match(/<a\b[^>]*>(?:(?!<\/a>).)*Join the waitlist.*?<\/a>/)?.[0];
}

describe("PromoBannerView", () => {
  it("keeps the CMS message as written", () => {
    expect(render({ waitlistLink: true })).toContain(`<span>${MESSAGE}</span>`);
  });

  it("adds a Join the waitlist link to #waitlist next to the message", () => {
    const html = render({ waitlistLink: true });
    const anchor = waitlistAnchor(html);
    expect(anchor).toMatch(/href="#waitlist"/);
    expect(html.indexOf(MESSAGE)).toBeLessThan(
      html.indexOf("Join the waitlist")
    );
  });

  it("can show the message without the link", () => {
    const html = render({ waitlistLink: false });
    expect(html).toContain(MESSAGE);
    expect(waitlistAnchor(html)).toBeUndefined();
  });
});
