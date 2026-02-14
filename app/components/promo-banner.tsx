import type { JSX } from "react";
import { StaticTinaMarkdown } from "tinacms/dist/rich-text/static";
import client from "@/tina/__generated__/client";

const components = {
  p: (props: { children: JSX.Element } | undefined) => (
    <p className="inline">{props?.children}</p>
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

  return (
    <div className="flex bg-[#F0DED3] p-2 w-screen items-center justify-center">
      <div className="text-center">
        {banner.message && (
          <StaticTinaMarkdown
            content={banner.message}
            components={components}
          />
        )}
      </div>
    </div>
  );
}
