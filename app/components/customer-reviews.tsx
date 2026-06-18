import type { CustomerReview } from "@/types/reviews";
import { CustomerReviewCard } from "./customer-review-card";
import { CustomerReviewsHeader } from "./customer-reviews-header";

interface CustomerReviewsProps {
  reviews: CustomerReview[];
}

export function CustomerReviews({ reviews }: CustomerReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-cream/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <CustomerReviewsHeader />

        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <CustomerReviewCard
              key={review.id}
              review={review}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
