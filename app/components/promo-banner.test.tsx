import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { BookingMode } from "@/lib/booking-mode";

const promoBanner = vi.fn();
vi.mock("@/tina/__generated__/client", () => ({
  default: { queries: { promoBanner } },
}));
const getBookingMode = vi.fn();
vi.mock("@/lib/get-booking-mode", () => ({ getBookingMode }));

const { PromoBanner } = await import("./promo-banner");

const MESSAGE = "On Maternity Leave";

async function renderBanner(mode: BookingMode) {
  getBookingMode.mockResolvedValue(mode);
  return renderToStaticMarkup(await PromoBanner());
}

describe("PromoBanner", () => {
  beforeEach(() => {
    promoBanner.mockResolvedValue({
      data: {
        promoBanner: {
          enabled: true,
          message: {
            type: "root",
            children: [
              { type: "p", children: [{ type: "text", text: MESSAGE }] },
            ],
          },
        },
      },
    });
  });

  it("offers the waitlist link in waitlist mode", async () => {
    const html = await renderBanner("waitlist");
    expect(html).toContain(MESSAGE);
    expect(html).toContain("Join the waitlist");
  });

  it("shows just the message in Acuity mode", async () => {
    const html = await renderBanner("acuity");
    expect(html).toContain(MESSAGE);
    expect(html).not.toContain("Join the waitlist");
    expect(html).not.toContain('href="#waitlist"');
  });
});
