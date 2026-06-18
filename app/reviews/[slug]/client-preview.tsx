"use client";

import { useTina } from "tinacms/dist/react";
import type { CustomerReviewQuery } from "@/tina/__generated__/types";
import { mapTinaReviewToCustomerReview } from "@/lib/get-reviews";
import { CustomerReviewCard } from "@/app/components/customer-review-card";
import { CustomerReviewsHeader } from "@/app/components/customer-reviews-header";
import { ReviewPreviewLayout } from "@/app/components/review-preview-layout";

interface ClientReviewPreviewProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: CustomerReviewQuery;
}

export default function ClientReviewPreview(props: ClientReviewPreviewProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const tinaReview = data.customerReview;
  const review = mapTinaReviewToCustomerReview(
    tinaReview,
    tinaReview._sys.filename,
  );

  return (
    <ReviewPreviewLayout customerName={review.customerName}>
      <section className="py-12 bg-cream/40 -mx-4 px-4">
        <div className="mx-auto max-w-7xl">
          <CustomerReviewsHeader />
          <div className="mt-12 max-w-md mx-auto">
            <CustomerReviewCard review={review} priority />
          </div>
        </div>
      </section>
    </ReviewPreviewLayout>
  );
}
