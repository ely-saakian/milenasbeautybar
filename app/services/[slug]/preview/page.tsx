import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import ClientServicePreview from "@/app/services/[slug]/client-preview";

export const metadata = {
  robots: "noindex, nofollow",
};

interface PreviewParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const response = await client.queries.serviceConnection();
  const edges = response.data?.serviceConnection?.edges ?? [];
  return edges
    .map((edge) => edge?.node?._sys?.filename)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export default async function PreviewService({ params }: PreviewParams) {
  const { slug } = await params;

  let data;
  try {
    data = await client.queries.service({
      relativePath: `${slug}.md`,
    });
  } catch {
    notFound();
  }

  return (
    <ClientServicePreview
      query={data.query}
      variables={data.variables}
      data={data.data}
    />
  );
}
