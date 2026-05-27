"use client";

import React, { useState } from "react";

const faqData: FAQItem[] = [
  {
    question:
      "Can I get my lashes or brows wet right after lamination/lifting?",
    answer: (
      <p>
        Some modern formulas allow earlier water contact, but it depends on the
        product and your natural lashes. At Milena&apos;s Beauty Bar we use Zola
        and LashBase, and both recommend leaving the third step &quot;Enriching
        Solution&quot; on for <strong>12 hours</strong> — therefore please avoid
        getting lashes or brows wet for <strong>12 hours</strong> after
        treatment.
      </p>
    ),
  },
  {
    question: "How long does a lash lift and tint last?",
    answer: (
      <p>
        A lash lift typically lasts <strong>6–8 weeks</strong>, depending on
        your natural lash cycle and aftercare. Tinting lasts about{" "}
        <strong>3–4 weeks</strong>. Results vary based on lash health/cycles.
      </p>
    ),
  },
  {
    question: "Is brow lamination safe, and how long do results last?",
    answer: (
      <p>
        Yes! Brow lamination is safe when performed by a trained professional.
        It lasts <strong>6–7 weeks</strong> on average. Brows may appear fuller,
        lifted, and more defined. You should avoid getting them wet for the
        first 24 hours for best results. Keeping them hydrated and nourished
        after lamination is important, aftercare oil is encouraged.
      </p>
    ),
  },
  {
    question: "How do I establish Long-Term Care for lash lift or extensions?",
    answer: (
      <ul className="list-disc list-inside space-y-2">
        <li>
          Be gentle when cleansing or applying skincare around your lashes.
        </li>
        <li>
          Protect your lashes from very hot, steamy environments (sauna, very
          hot showers) when possible.
        </li>
        <li>
          Schedule <strong>a touch-up or refill</strong> according to your
          natural hair growth — typically every 6–8 weeks for lash lift and 2-4
          weeks for extensions.
        </li>
      </ul>
    ),
  },
  {
    question: "Are lash lifts or extensions safe for everyone?",
    answer: (
      <div className="flex flex-col gap-3">
        <p>
          Most people are good candidates. You may not be eligible if you have:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Eye infections</li>
          <li>Active allergies</li>
          <li>Recent eye surgery</li>
          <li>Extremely weak or brittle natural lashes</li>
          <li>Skin conditions around the eyes/brows</li>
        </ul>
        <p>
          If you&apos;re unsure, feel free to message me before booking or book
          a consultation.
        </p>
      </div>
    ),
  },
  {
    question:
      "What should I avoid before and after my lash or brow appointment?",
    answer:
      "Before your service, please come with a clean, makeup-free face so I can work on fresh lashes and brows. If you're getting any waxing, pause retinols, acne medications, and strong skincare actives beforehand so your skin stays safe and doesn't lift. After your appointment, follow the specific aftercare for your lift, lamination, or extensions — that usually means being gentle, avoiding oils, and keeping the area dry based on the brand instructions I use. And for extensions, avoid rubbing, sleeping on your face, using waterproof mascara, or using oil-based products.",
  },
  {
    question: "General tips for all services",
    answer: (
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Patch Test</strong>: Always recommend a patch test 24–48 hours
          before service if you&apos;re new or have sensitive skin.
        </li>
        <li>
          <strong>Avoid Rubbing</strong>: No rubbing, pulling, or playing with
          your lashes / brows.
        </li>
        <li>
          <strong>Be Gentle with Products</strong>: Choose non-oily, gentle,
          lash-safe products for makeup removal and skincare around your eyes.
        </li>
        <li>
          <strong>Communicate</strong>: If your lashes ever feel very dry,
          brittle, or irritated — reach out to your technician for advice or
          follow-up.
        </li>
      </ul>
    ),
  },
];

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export function FAQs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-espresso text-cream">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-cream/60">
            Good to know
          </p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-cream/70 max-w-2xl mx-auto">
            A few answers to help you feel prepared and confident before your
            visit.
          </p>
        </div>

        <ul className="mt-12 divide-y divide-cream/15 border-y border-cream/15">
          {faqData.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="font-serif text-lg sm:text-xl pr-2">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 flex-shrink-0 h-7 w-7 rounded-full border border-cream/40 inline-flex items-center justify-center transition ${
                      isOpen ? "rotate-45 bg-cream text-espresso" : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-cream/75 leading-relaxed pr-10 max-w-2xl [&_strong]:text-cream [&_strong]:font-semibold">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 text-center">
          <p className="text-cream/60 text-sm">Still have questions?</p>
          <a
            href="https://milenasbeautybar.as.me/?appointmentType=83824594"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-serif text-2xl sm:text-3xl border-b border-cream pb-1 hover:text-cream/80 transition-colors"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
