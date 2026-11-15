import { afterEach, describe, expect, it, vi } from "vitest";
import { getSql } from "./db";

describe("getSql", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("fails with a clear message when DATABASE_URL is not set", () => {
    vi.stubEnv("DATABASE_URL", "");
    expect(() => getSql()).toThrow(/DATABASE_URL is not set/);
  });
});
