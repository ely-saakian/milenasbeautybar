"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData: FAQItem[] = [
  {
    question:
      "Can I get my lashes or brows wet right after lamination/lifting?",
    answer: (
      <p>
        Some modern formulas allow earlier water contact, but it depends on the
        product and your natural lashes. At Milena’s Beauty Bar we use Zola and
        LashBase, and both recommend leaving the third step “Enriching Solution”
        on for <strong>12 hours</strong> — therefore please avoid getting lashes
        or brows wet for <strong>12 hours</strong> after treatment.
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
      <ul className="list-disc list-inside">
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
      <div className="flex flex-col gap-2">
        <p>
          Most people are good candidates. You may not be eligible if you have:
        </p>
        <ul className="list-disc list-inside pl-4">
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
      "Before your service, please come with a clean, makeup-free face so I can work on fresh lashes and brows. If you’re getting any waxing, pause retinols, acne medications, and strong skincare actives beforehand so your skin stays safe and doesn’t lift. After your appointment, follow the specific aftercare for your lift, lamination, or extensions — that usually means being gentle, avoiding oils, and keeping the area dry based on the brand instructions I use. And for extensions, avoid rubbing, sleeping on your face, using waterproof mascara, or using oil-based products.",
  },
  {
    question: "General tips for all services",
    answer: (
      <ul className="list-disc list-inside">
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

interface FAQItemComponentProps {
  faq: FAQItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function FAQItemComponent({
  faq,
  index,
  isExpanded,
  onToggle,
}: FAQItemComponentProps) {
  return (
    <div key={index}>
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start gap-3 transition-opacity"
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <ChevronUp className="mt-1 shrink-0" size={20} />
        ) : (
          <ChevronDown className="mt-1 shrink-0" size={20} />
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-medium mb-2">{faq.question}</h3>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="leading-relaxed pt-2">{faq.answer}</div>
          </div>
        </div>
      </button>
    </div>
  );
}

export function FAQs() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  // Split FAQs into two columns
  const leftColumn = faqData.slice(0, Math.ceil(faqData.length / 2));
  const rightColumn = faqData.slice(Math.ceil(faqData.length / 2));

  return (
    <section id="faqs" className="flex flex-col gap-12">
      <h2 className="text-3xl font-serif font-bold">FAQs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {leftColumn.map((faq, index) => {
            const actualIndex = index;
            return (
              <FAQItemComponent
                key={actualIndex}
                faq={faq}
                index={actualIndex}
                isExpanded={expandedIndex === actualIndex}
                onToggle={() => handleToggle(actualIndex)}
              />
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {rightColumn.map((faq, index) => {
            const actualIndex = index + leftColumn.length;
            return (
              <FAQItemComponent
                key={actualIndex}
                faq={faq}
                index={actualIndex}
                isExpanded={expandedIndex === actualIndex}
                onToggle={() => handleToggle(actualIndex)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
