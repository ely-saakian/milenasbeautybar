"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { BookingLink } from "./booking-link";

const INSTAGRAM_URL = "https://www.instagram.com/milenas.beautybar/";

const links = [
  { href: "/#packages", label: "Packages" },
  { href: "/#brows", label: "Brows" },
  { href: "/#lashes", label: "Lashes" },
  { href: "/#facial-wax", label: "Facial Wax" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Escape inside a modal (the waitlist form) closes that, not the menu,
      // so focus can return to the Book link the form was opened from.
      if (document.querySelector("dialog:modal")) return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-200 ${
        scrolled
          ? "bg-background/85 backdrop-blur border-b border-border"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
        aria-label="Primary"
      >
        <Logo className="text-espresso" />

        <ul className="hidden lg:flex items-center gap-8 text-sm text-espresso/80">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="hover:text-espresso transition relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-espresso after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden sm:inline-flex size-11 items-center justify-center rounded-full text-espresso hover:bg-cream active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <SiInstagram width={18} height={18} />
          </a>
          <BookingLink className="hidden sm:inline-flex items-center rounded-full bg-espresso px-5 py-2.5 text-sm font-medium text-cream hover:bg-espresso-soft active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]">
            Book an Appointment
          </BookingLink>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-full text-espresso hover:bg-cream active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-[opacity,rotate,filter] duration-200 ease-out ${
                  open
                    ? "opacity-0 rotate-90 blur-[2px]"
                    : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-[opacity,rotate,filter] duration-200 ease-out ${
                  open
                    ? "opacity-100 rotate-0"
                    : "opacity-0 -rotate-90 blur-[2px]"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden absolute top-full left-0 right-0 bg-background border-y border-border shadow-lg shadow-espresso/5 transition-[opacity,translate,visibility] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
          open
            ? "opacity-100 translate-y-0 visible duration-200"
            : "opacity-0 -translate-y-2 pointer-events-none invisible duration-150"
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-espresso border-b border-border/60"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border text-espresso active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
            >
              <SiInstagram width={18} height={18} />
            </a>
            <BookingLink className="flex-1 inline-flex justify-center items-center rounded-full bg-espresso px-5 py-3 text-sm font-medium text-cream hover:bg-espresso-soft active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]">
              Book an Appointment
            </BookingLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
