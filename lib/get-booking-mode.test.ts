import { readFile } from "node:fs/promises";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getBookingMode } from "./get-booking-mode";

vi.mock("node:fs/promises", { spy: true });

describe("getBookingMode", () => {
  afterEach(() => {
    vi.mocked(readFile).mockRestore();
  });

  it("reads the mode Milena picked in TinaCMS", async () => {
    vi.mocked(readFile).mockResolvedValueOnce("---\nmode: acuity\n---\n");
    await expect(getBookingMode()).resolves.toBe("acuity");
  });

  it("falls back to the waitlist when the entry can't be read", async () => {
    vi.mocked(readFile).mockRejectedValueOnce(
      Object.assign(new Error("ENOENT"), { code: "ENOENT" })
    );
    await expect(getBookingMode()).resolves.toBe("waitlist");
  });
});
