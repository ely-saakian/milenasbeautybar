"use client";

import {
  useState,
  useSyncExternalStore,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { WaitlistLink } from "./waitlist/waitlist-link";

const STORAGE_KEY = "promo-banner-dismissed";

function readDismissed() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage unavailable (private mode, blocked); dismissal lasts this page only.
  }
}

// sessionStorage has no same-tab change event; the value is only read on
// hydration and written on dismiss, so there is nothing to subscribe to.
const subscribe = () => () => {};

type PromoBannerViewProps = {
  /** The banner message from TinaCMS. */
  children: ReactNode;
  /** Show "Join the waitlist →" after the message. */
  waitlistLink: boolean;
};

export function PromoBannerView({
  children,
  waitlistLink,
}: PromoBannerViewProps) {
  // Server (and hydration) render as not dismissed so markup matches; React
  // re-renders with the stored value right after hydration.
  const storedDismissed = useSyncExternalStore(
    subscribe,
    readDismissed,
    () => false
  );
  const [closing, setClosing] = useState(false);
  const [gone, setGone] = useState(false);

  if (gone || (storedDismissed && !closing)) return null;

  const dismiss = () => {
    writeDismissed();
    setClosing(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
    }
  };

  const onTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (
      closing &&
      e.target === e.currentTarget &&
      e.propertyName === "grid-template-rows"
    ) {
      setGone(true);
    }
  };

  return (
    <div
      inert={closing}
      aria-hidden={closing || undefined}
      onTransitionEnd={onTransitionEnd}
      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
        closing ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
      }`}
    >
      <div className={`min-h-0 ${closing ? "overflow-hidden" : ""}`}>
        <div className="relative bg-espresso text-cream">
          <div className="mx-auto max-w-7xl px-4 py-2 pr-12 text-center text-xs sm:text-sm tracking-wide">
            {children}
            {waitlistLink && (
              // Its own line on phones, inline after the message from `sm` up.
              <span className="mt-0.5 block sm:mt-0 sm:ml-3.5 sm:inline">
                <WaitlistLink className="font-semibold tracking-normal text-cream underline decoration-cream/60 underline-offset-4 hover:decoration-cream transition-[text-decoration-color] duration-150 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream">
                  Join the waitlist<span aria-hidden="true"> →</span>
                </WaitlistLink>
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="group absolute right-0 top-1/2 -translate-y-1/2 inline-flex size-11 items-center justify-center text-cream/80 hover:text-cream active:scale-[0.97] transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            {/* 44px hit area; the visible circle stays small so it fits the bar. */}
            <span className="inline-flex rounded-full p-1.5 group-hover:bg-cream/10 transition-[background-color] duration-150">
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
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
