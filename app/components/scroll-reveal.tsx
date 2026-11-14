"use client";

import { useAnimate, useInView } from "motion/react";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const OFFSET_Y = 12;

/**
 * Fades + lifts its children in the first time they scroll into view.
 *
 * The server HTML is always fully visible, so content never depends on JS.
 * After mount, only elements that start *below* the fold are hidden (before
 * paint) and then revealed on scroll; anything already on screen just stays
 * put, so there is no flash. Reduced motion: opacity-only, no movement.
 */
export function ScrollReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.2 });
  const armed = useRef(false);
  const reduced = useRef(false);

  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    armed.current = true;
    animate(
      el,
      { opacity: 0, y: reduced.current ? 0 : OFFSET_Y },
      { duration: 0 }
    );
  }, [scope, animate]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    armed.current = false;
    animate(
      scope.current,
      { opacity: 1, y: 0 },
      reduced.current
        ? { duration: 0.2, ease: "linear", delay }
        : { duration: 0.45, ease: EASE_OUT, delay }
    );
  }, [inView, animate, scope, delay]);

  return <div ref={scope}>{children}</div>;
}
