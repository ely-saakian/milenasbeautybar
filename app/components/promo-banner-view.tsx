"use client";

import { useState, type ReactNode } from "react";

export function PromoBannerView({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-4 py-2 pr-10 text-center text-xs sm:text-sm tracking-wide">
        {children}
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-cream/80 hover:text-cream hover:bg-cream/10 transition"
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
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
