import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import ClientReviewPreview from "@/app/reviews/[slug]/client-preview";

export const metadata = {
  robots: "noindex, nofollow",
};

interface PreviewParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const response = await client.queries.customerReviewConnection();
  const edges = response.data?.customerReviewConnection?.edges ?? [];
  return edges
    .map((edge) => edge?.node?._sys?.filename)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export default async function PreviewReview({ params }: PreviewParams) {
  const { slug } = await params;

  let data;
  try {
    data = await client.queries.customerReview({
      relativePath: `${slug}.md`,
    });
  } catch {
    notFound();
  }

  return (
    <ClientReviewPreview
      query={data.query}
      variables={data.variables}
      data={data.data}
    />
  );
}
