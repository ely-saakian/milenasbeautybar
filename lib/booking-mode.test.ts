import { describe, expect, it } from "vitest";
import { bookingModeFromMarkdown, resolveBookingMode } from "./booking-mode";

describe("resolveBookingMode", () => {
  it("keeps the waitlist when TinaCMS says waitlist", () => {
    expect(resolveBookingMode("waitlist")).toBe("waitlist");
  });

  it("goes back to Acuity when TinaCMS says acuity", () => {
    expect(resolveBookingMode("acuity")).toBe("acuity");
  });

  it.each([undefined, null, "", "Acuity", " acuity", "calendly", 1, true])(
    "falls back to the waitlist for a missing or unknown value (%j)",
    (value) => {
      expect(resolveBookingMode(value)).toBe("waitlist");
    }
  );
});

describe("bookingModeFromMarkdown", () => {
  it("reads the mode TinaCMS saved in the front matter", () => {
    expect(bookingModeFromMarkdown("---\nmode: acuity\n---\n")).toBe("acuity");
    expect(bookingModeFromMarkdown("---\nmode: waitlist\n---\n")).toBe(
      "waitlist"
    );
  });

  it("accepts a quoted value and Windows line endings", () => {
    expect(bookingModeFromMarkdown("---\r\nmode: 'acuity'\r\n---\r\n")).toBe(
      "acuity"
    );
    expect(bookingModeFromMarkdown('---\nmode: "acuity"\n---\n')).toBe(
      "acuity"
    );
  });

  it("ignores a trailing YAML comment", () => {
    expect(bookingModeFromMarkdown("---\nmode: acuity # reopened\n---\n")).toBe(
      "acuity"
    );
  });

  it.each([
    ["an empty file", ""],
    ["no front matter", "mode: acuity\n"],
    ["no mode field", "---\ntitle: Booking\n---\n"],
    ["an unknown mode", "---\nmode: calendly\n---\n"],
    ["a mode only in the body", "---\ntitle: x\n---\nmode: acuity\n"],
  ])("falls back to the waitlist for %s", (_, source) => {
    expect(bookingModeFromMarkdown(source)).toBe("waitlist");
  });
});
