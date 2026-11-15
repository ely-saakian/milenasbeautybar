import { describe, expect, it } from "vitest";
import { isWaitlistHash, urlWithoutWaitlistHash } from "./waitlist-hash";

describe("isWaitlistHash", () => {
  it("recognises the shareable #waitlist link", () => {
    expect(isWaitlistHash("#waitlist")).toBe(true);
  });

  it("ignores other anchors and no hash at all", () => {
    expect(isWaitlistHash("")).toBe(false);
    expect(isWaitlistHash("#")).toBe(false);
    expect(isWaitlistHash("#services")).toBe(false);
    expect(isWaitlistHash("#waitlist-faq")).toBe(false);
  });
});

describe("urlWithoutWaitlistHash", () => {
  it("drops #waitlist and keeps the page and its query", () => {
    expect(
      urlWithoutWaitlistHash({
        pathname: "/blog/lash-lift-aftercare",
        search: "?utm_source=instagram",
        hash: "#waitlist",
      })
    ).toBe("/blog/lash-lift-aftercare?utm_source=instagram");
  });

  it("leaves the URL alone when the hash is something else", () => {
    expect(
      urlWithoutWaitlistHash({ pathname: "/", search: "", hash: "#services" })
    ).toBeNull();
    expect(
      urlWithoutWaitlistHash({ pathname: "/", search: "", hash: "" })
    ).toBeNull();
  });
});
