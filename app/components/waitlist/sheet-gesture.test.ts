import { describe, expect, it } from "vitest";
import { dragOffset, shouldDismiss } from "./sheet-gesture";

describe("shouldDismiss", () => {
  it("closes once the sheet is dragged past a quarter of its height", () => {
    // 400px sheet: a slow 120px drag (30%) closes it.
    expect(
      shouldDismiss({ distance: 120, elapsedMs: 2000, sheetHeight: 400 })
    ).toBe(true);
  });

  it("springs back from a short, slow drag", () => {
    // 60px in 1s on a 400px sheet: 15% and 0.06px/ms, under both thresholds.
    expect(
      shouldDismiss({ distance: 60, elapsedMs: 1000, sheetHeight: 400 })
    ).toBe(false);
  });

  it("closes on a quick flick even when it's short", () => {
    // 40px in 200ms is 0.2px/ms, well past a flick.
    expect(
      shouldDismiss({ distance: 40, elapsedMs: 200, sheetHeight: 400 })
    ).toBe(true);
  });

  it("ignores a tap that jitters a few px", () => {
    // 3px in 20ms is fast (0.15px/ms) but no one meant to swipe.
    expect(
      shouldDismiss({ distance: 3, elapsedMs: 20, sheetHeight: 400 })
    ).toBe(false);
  });

  it("never closes on a flick upward", () => {
    expect(
      shouldDismiss({ distance: -200, elapsedMs: 100, sheetHeight: 400 })
    ).toBe(false);
  });
});

describe("dragOffset", () => {
  it("follows the finger one to one when dragging down", () => {
    expect(dragOffset(0)).toBe(0);
    expect(dragOffset(150)).toBe(150);
  });

  it("resists dragging up past the top, more the further it goes", () => {
    const small = dragOffset(-20);
    const medium = dragOffset(-100);
    const large = dragOffset(-400);

    // It still moves up...
    expect(small).toBeLessThan(0);
    // ...but less than the finger...
    expect(small).toBeGreaterThan(-20);
    // ...and each extra px of finger moves it less.
    expect(large).toBeLessThan(medium);
    const earlyGain = (small - medium) / 80; // per px, from 20 to 100
    const lateGain = (medium - large) / 300; // per px, from 100 to 400
    expect(lateGain).toBeLessThan(earlyGain);
    // It never gets far from the top.
    expect(dragOffset(-10_000)).toBeGreaterThan(-40);
  });
});
