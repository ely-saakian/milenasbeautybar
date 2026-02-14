"use client";

import { useEffect, useRef, useCallback } from "react";

export function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null);

  const createHeart = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const heart = document.createElement("div");
    heart.classList.add("floating-heart");

    const x = Math.random() * 100;
    const scale = Math.random() * 0.6 + 0.2;
    const duration = Math.random() * 4 + 6;
    const sway = Math.random() * 60 + 20;
    const swayDuration = Math.random() * 2 + 2;

    heart.style.left = `${x}%`;
    heart.style.transform = `scale(${scale})`;
    heart.style.animationDuration = `${duration}s, ${swayDuration}s`;
    heart.style.setProperty("--sway", `${sway}px`);

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }, []);

  useEffect(() => {
    // Spawn an initial batch with staggered delays
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createHeart(), i * 400);
    }

    // Continuously spawn hearts
    const interval = setInterval(createHeart, 800);

    return () => clearInterval(interval);
  }, [createHeart]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-51"
      aria-hidden="true"
    />
  );
}
