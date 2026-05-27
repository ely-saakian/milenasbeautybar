import type { JSX } from "react";
import { StaticTinaMarkdown } from "tinacms/dist/rich-text/static";
import client from "@/tina/__generated__/client";
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

  const banner = data.data.promoBanner;
  if (!banner.enabled) return null;
  if (!banner.message) return null;

  return (
    <PromoBannerView>
      <StaticTinaMarkdown content={banner.message} components={components} />
    </PromoBannerView>
  );
}
