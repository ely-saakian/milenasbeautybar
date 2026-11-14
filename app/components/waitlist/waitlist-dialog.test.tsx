import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { WaitlistDialog, type WaitlistSurface } from "./waitlist-dialog";

const noop = () => {};

function dialogMarkup(variant: WaitlistSurface) {
  return renderToStaticMarkup(
    <WaitlistDialog
      open
      variant={variant}
      service="Lash Lift"
      session={1}
      onClose={noop}
      onClosed={noop}
    />
  );
}

/** The opening tag of the first `name` element. */
const openingTag = (html: string, name: string) =>
  html.match(new RegExp(`<${name}\\b[^>]*>`))?.[0] ?? "";

describe("WaitlistDialog as a mobile sheet", () => {
  const html = dialogMarkup("sheet");

  it("is a dialog named by the form's heading", () => {
    const dialog = openingTag(html, "dialog");
    expect(dialog).toContain('aria-labelledby="waitlist-title"');
    expect(html).toContain('id="waitlist-title"');
  });

  it("has a grab handle to swipe it closed", () => {
    expect(html).toContain("data-sheet-handle");
  });

  it("has a labelled close button", () => {
    expect(html).toMatch(/<button[^>]*aria-label="Close"/);
  });
});

describe("WaitlistDialog as the desktop modal", () => {
  it("has no grab handle", () => {
    const html = dialogMarkup("modal");
    expect(html).not.toContain("data-sheet-handle");
    expect(html).toMatch(/<button[^>]*aria-label="Close"/);
  });
});
