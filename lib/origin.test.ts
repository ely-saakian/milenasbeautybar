import { describe, expect, it } from "vitest";
import { isAllowedOrigin } from "./origin";

const production = { NODE_ENV: "production" };

const preview = {
  NODE_ENV: "production",
  VERCEL_URL: "milenasbeautybar-abc123-ely.vercel.app",
  VERCEL_BRANCH_URL: "milenasbeautybar-git-waitlist-ely.vercel.app",
  VERCEL_PROJECT_PRODUCTION_URL: "milenasbeautybar.com",
};

const development = { NODE_ENV: "development" };

describe("isAllowedOrigin", () => {
  it("allows the production domain, with and without www", () => {
    expect(isAllowedOrigin("https://milenasbeautybar.com", production)).toBe(
      true
    );
    expect(
      isAllowedOrigin("https://www.milenasbeautybar.com", production)
    ).toBe(true);
  });

  it("allows a Vercel deployment's own URLs", () => {
    expect(
      isAllowedOrigin("https://milenasbeautybar-abc123-ely.vercel.app", preview)
    ).toBe(true);
    expect(
      isAllowedOrigin(
        "https://milenasbeautybar-git-waitlist-ely.vercel.app",
        preview
      )
    ).toBe(true);
  });

  it("doesn't allow other vercel.app sites", () => {
    expect(isAllowedOrigin("https://someone-else.vercel.app", preview)).toBe(
      false
    );
  });

  it("allows localhost on any port in development", () => {
    expect(isAllowedOrigin("http://localhost:3000", development)).toBe(true);
    expect(isAllowedOrigin("http://127.0.0.1:4321", development)).toBe(true);
    expect(isAllowedOrigin("http://localhost", development)).toBe(true);
  });

  it("doesn't allow localhost in production", () => {
    expect(isAllowedOrigin("http://localhost:3000", production)).toBe(false);
  });

  it("rejects foreign, missing and malformed origins", () => {
    expect(isAllowedOrigin("https://evil.example", production)).toBe(false);
    expect(isAllowedOrigin("https://evil.example", development)).toBe(false);
    expect(isAllowedOrigin(null, production)).toBe(false);
    expect(isAllowedOrigin(null, development)).toBe(false);
    expect(isAllowedOrigin("null", development)).toBe(false);
    expect(isAllowedOrigin("", development)).toBe(false);
  });

  it("matches the whole origin, not a prefix or a lookalike", () => {
    expect(
      isAllowedOrigin("https://milenasbeautybar.com.evil.example", production)
    ).toBe(false);
    expect(isAllowedOrigin("http://milenasbeautybar.com", production)).toBe(
      false
    );
    expect(isAllowedOrigin("http://localhost.evil.example", development)).toBe(
      false
    );
    expect(isAllowedOrigin("https://localhost:3000", development)).toBe(false);
  });
});
