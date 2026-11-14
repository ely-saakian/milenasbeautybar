import type { ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { INSTAGRAM_URL } from "@/lib/constants";
import { SignupDone, SignupFormView } from "./waitlist-form";

const noop = () => {};

/** Render the form as it looks in `state`, with what the visitor typed. */
function form(state: ComponentProps<typeof SignupFormView>["state"]) {
  return renderToStaticMarkup(
    <SignupFormView
      state={state}
      name="Sarah Kim"
      phone="253 555 01"
      onNameChange={noop}
      onPhoneChange={noop}
      onSubmit={noop}
    />
  );
}

/** The opening tag of the element with `id`. */
function tag(html: string, id: string): string {
  return html.match(new RegExp(`<[^>]*\\sid="${id}"[^>]*>`))?.[0] ?? "";
}

/** Visible text, tags stripped. */
const text = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&");

/** The submit button's label. */
const submitLabel = (html: string) =>
  text(html.match(/<button type="submit"[\s\S]*?<\/button>/)?.[0] ?? "");

describe("SignupFormView", () => {
  it("starts with no errors and the plain submit label", () => {
    const html = form({ status: "idle" });

    expect(html).not.toContain("aria-invalid");
    expect(html).not.toContain('role="alert"');
    expect(submitLabel(html)).toBe("Join the waitlist");
  });

  it("uses its own messages instead of the browser's", () => {
    expect(tag(form({ status: "idle" }), "waitlist-form")).toMatch(
      /novalidate/i
    );
  });

  it("keeps what was typed", () => {
    const html = form({ status: "error" });

    expect(tag(html, "waitlist-name")).toContain('value="Sarah Kim"');
    expect(tag(html, "waitlist-phone")).toContain('value="253 555 01"');
  });

  it("shows each field's message under it, linked for screen readers", () => {
    const html = form({
      status: "invalid",
      fields: {
        name: "Please enter your name.",
        phone: "Enter a 10-digit US mobile number.",
      },
    });

    const name = tag(html, "waitlist-name");
    expect(name).toContain('aria-invalid="true"');
    expect(name).toContain('aria-describedby="waitlist-name-error"');
    expect(html).toMatch(
      /id="waitlist-name-error"[^>]*>Please enter your name\.</
    );

    const phone = tag(html, "waitlist-phone");
    expect(phone).toContain('aria-invalid="true"');
    expect(phone).toContain('aria-describedby="waitlist-phone-error"');
    expect(html).toMatch(
      /id="waitlist-phone-error"[^>]*>Enter a 10-digit US mobile number\.</
    );
  });

  it("only marks the field that is wrong", () => {
    const html = form({
      status: "invalid",
      fields: { phone: "Enter a 10-digit US mobile number." },
    });

    expect(tag(html, "waitlist-name")).not.toContain("aria-invalid");
    expect(html).not.toContain('id="waitlist-name-error"');
    expect(tag(html, "waitlist-phone")).toContain('aria-invalid="true"');
  });

  it("shows the retry alert with an Instagram link after a failure", () => {
    const html = form({ status: "error" });

    const alert = html.match(/<div role="alert"[\s\S]*?<\/div>/)?.[0] ?? "";
    expect(text(alert)).toBe(
      "Something went wrong on my end. Please try again in a minute, or message me on Instagram."
    );
    expect(alert).toContain(`href="${INSTAGRAM_URL}"`);
    expect(submitLabel(html)).toBe("Try again");
  });

  it("has a hidden website field for bots, out of sight and out of the tab order", () => {
    const html = form({ status: "idle" });

    const input = tag(html, "waitlist-website");
    expect(input).toContain('name="website"');
    expect(input).toContain('tabindex="-1"');
    expect(input).toContain('autoComplete="off"');
    // A password manager filling it would silently drop a real signup.
    expect(input).toContain('data-1p-ignore="true"');
    expect(input).toContain('data-lpignore="true"');
    expect(html).toMatch(/<label for="waitlist-website"[^>]*>Website</);

    // Off-screen (not display:none, which some bots skip) and hidden from
    // screen readers, label included.
    const wrapper =
      html.match(/<div[^>]*>(?=<label for="waitlist-website")/)?.[0] ?? "";
    expect(wrapper).toContain('aria-hidden="true"');
    expect(wrapper).toMatch(/-left-\[10000px\]/);
    expect(wrapper).not.toMatch(
      /class="(?:[^"]*\s)?hidden[\s"]|display:\s*none/
    );
  });

  it("shows the sending state and can't be pressed again", () => {
    const html = form({ status: "submitting" });

    expect(html).toMatch(/<button type="submit" aria-disabled="true"/);
    expect(submitLabel(html)).toBe("Adding you…");
  });
});

describe("SignupDone", () => {
  it("welcomes a new signup by first name", () => {
    const html = renderToStaticMarkup(
      <SignupDone
        result={{
          status: "created",
          firstName: "Sarah",
          phone: "(253) 555-0147",
          service: "Lash Lift",
        }}
        onDone={noop}
      />
    );

    expect(text(html)).toContain("You're on the list, Sarah");
    expect(text(html)).toContain(
      "I'll text (253) 555-0147 as soon as booking reopens for your Lash Lift."
    );
  });

  it("tells a returning phone it's already listed, echoing only what they typed", () => {
    const html = renderToStaticMarkup(
      <SignupDone
        result={{
          status: "already_listed",
          firstName: "Sarah",
          phone: "(253) 555-0147",
          service: "Lash Lift",
        }}
        onDone={noop}
      />
    );

    expect(text(html)).toContain("You're already on the list");
    expect(text(html)).toContain(
      "(253) 555-0147 is already saved. No need to do anything else."
    );
    expect(text(html)).not.toContain("You're on the list,");
  });
});
