import { describe, expect, it } from "vitest";
import { formatUsPhone, normalizeUsPhone } from "./phone";

describe("normalizeUsPhone", () => {
  it("turns a formatted 10-digit US number into E.164", () => {
    expect(normalizeUsPhone("(253) 555-0147")).toBe("+12535550147");
  });

  it("accepts an optional leading 1 country code", () => {
    expect(normalizeUsPhone("1 253 555 0147")).toBe("+12535550147");
    expect(normalizeUsPhone("+1 (253) 555-0147")).toBe("+12535550147");
  });

  it.each([
    ["too short", "253 555 01"],
    ["too long", "253 555 01470"],
    ["11 digits not starting with 1", "2253 555 0147"],
    ["a leading 1 with too few digits", "1 253 555 01"],
    ["empty", ""],
    ["only formatting", "() - "],
    ["letters mixed in", "253-555-CALL"],
    ["an extension", "253 555 0147 x12"],
    ["a plus sign that is not leading", "253+555-0147"],
  ])("rejects %s", (_label, input) => {
    expect(normalizeUsPhone(input)).toBeNull();
  });
});

describe("formatUsPhone", () => {
  it("shows a stored E.164 number the way people write it", () => {
    expect(formatUsPhone("+12535550147")).toBe("(253) 555-0147");
  });

  it("formats whatever the visitor typed, once it is valid", () => {
    expect(formatUsPhone("1-253-555-0147")).toBe("(253) 555-0147");
  });

  it("leaves an invalid number as typed", () => {
    expect(formatUsPhone("253 555 01")).toBe("253 555 01");
  });
});
