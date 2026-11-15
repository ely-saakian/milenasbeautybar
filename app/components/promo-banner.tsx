import type { JSX } from "react";
import { StaticTinaMarkdown } from "tinacms/dist/rich-text/static";
import client from "@/tina/__generated__/client";
import { getBookingMode } from "@/lib/get-booking-mode";
import { PromoBannerView } from "./promo-banner-view";

const components = {
  p: (props: { children: JSX.Element } | undefined) => (
    <span className="inline">{props?.children}</span>
  ),
};

export async function PromoBanner() {
  let data;
  try {
    data = await client.queries.promoBanner({
      relativePath: "promo-banner.md",
    });
  } catch {
    return null;
  }
  const mode = await getBookingMode();

  const banner = data.data.promoBanner;
  if (!banner.enabled) return null;
  if (!banner.message) return null;

  return (
    // "Join the waitlist →" only while Book links open the waitlist
    // (TinaCMS → Booking → Mode).
    <PromoBannerView waitlistLink={mode === "waitlist"}>
      <StaticTinaMarkdown content={banner.message} components={components} />
    </PromoBannerView>
  );
}
