"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

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

interface FAQItemComponentProps {
  faq: FAQItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function FAQItemComponent({
  faq,
  isExpanded,
  onToggle,
}: FAQItemComponentProps) {
  return (
    <div
      className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ease-out
        ${
          isExpanded
            ? "ring-2 ring-[#F0DED3] shadow-lg"
            : "hover:border-[#F0DED3]"
        }
      `}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start gap-4 cursor-pointer hover:bg-[#F0DED3]/10 transition-colors"
        aria-expanded={isExpanded}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isExpanded
              ? "bg-[#C4A484]"
              : "bg-[#F0DED3]/50 group-hover:bg-[#F0DED3]"
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-all duration-300 ${
              isExpanded ? "text-white rotate-180" : "text-[#C4A484]"
            }`}
          />
        </div>
        <div className="flex-1 pt-0.5">
          <h3 className="text-lg font-serif font-semibold text-gray-900 leading-snug">
            {faq.question}
          </h3>
        </div>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-0">
            <div className="ml-12 p-4 rounded-xl bg-[#F0DED3]/20 border border-[#F0DED3]/40">
              <div className="text-gray-600 leading-relaxed [&_strong]:text-gray-800 [&_strong]:font-semibold">
                {faq.answer}
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <section id="faqs" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">FAQs</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
