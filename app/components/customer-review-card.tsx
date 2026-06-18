"use client";

import Image from "next/image";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { CustomerReview } from "@/types/reviews";
import { CompareReveal } from "./compare-reveal";

interface CustomerReviewCardProps {
  review: CustomerReview;
  priority?: boolean;
}

export function CustomerReviewCard({
  review,
  priority = false,
}: CustomerReviewCardProps) {
  const categoryLabel =
    CATEGORY_LABELS[review.serviceCategory] ?? review.serviceCategory;

  return (
    <article className="flex flex-col gap-5">
      <CompareReveal
        aspectRatio="16/9"
        className="rounded-2xl ring-1 ring-espresso/10 shadow-lg overflow-hidden"
      >
        <CompareReveal.Before asChild>
          <Image
            src={review.beforeImage}
            alt={review.beforeAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority={priority}
            className="object-cover"
          />
        </CompareReveal.Before>
        <CompareReveal.After asChild>
          <Image
            src={review.afterImage}
            alt={review.afterAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </CompareReveal.After>
        <CompareReveal.Label slot="before">Before</CompareReveal.Label>
        <CompareReveal.Label slot="after">After</CompareReveal.Label>
        <CompareReveal.Handle />
        <CompareReveal.Overlay />
      </CompareReveal>

      <div className="flex flex-col gap-3 px-1">
        <blockquote className="font-serif text-lg sm:text-xl text-espresso leading-relaxed">
          &ldquo;{review.review}&rdquo;
        </blockquote>
        <p className="text-sm text-espresso/70">
          &mdash; {review.customerName}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full border border-espresso/20 bg-cream/60 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-espresso/80">
            {categoryLabel} · {review.serviceName}
          </span>
          <a
            href={review.bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-espresso underline underline-offset-4 decoration-espresso/30 hover:decoration-espresso transition"
          >
            Book
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
