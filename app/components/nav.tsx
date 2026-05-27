"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";

const BOOKING_URL = "https://milenasbeautybar.as.me/schedule/13baf9e3";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
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
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full text-espresso hover:bg-cream transition"
          >
            <SiInstagram width={18} height={18} />
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-full bg-espresso px-5 py-2.5 text-sm font-medium text-cream hover:bg-espresso-soft transition"
          >
            Book an Appointment
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-espresso hover:bg-cream transition"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t border-border transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-1 bg-background">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-espresso"
            >
              <SiInstagram width={18} height={18} />
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center rounded-full bg-espresso px-5 py-3 text-sm font-medium text-cream hover:bg-espresso-soft transition"
            >
              Book an Appointment
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
