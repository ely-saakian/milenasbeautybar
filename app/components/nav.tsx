"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { BookButton } from "./book-button";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Menu, X } from "lucide-react";

const BOOK_BUTTON_URL = "https://milenasbeautybar.as.me/schedule/13baf9e3";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Update header bottom position when menu opens or scroll changes
  useEffect(() => {
    function updateHeaderBottom() {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setHeaderBottom(rect.bottom);
      }
    }

    updateHeaderBottom();
    window.addEventListener("scroll", updateHeaderBottom, { passive: true });
    window.addEventListener("resize", updateHeaderBottom, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeaderBottom);
      window.removeEventListener("resize", updateHeaderBottom);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function handleNavClick() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header
        ref={headerRef}
        className="-mt-8 sticky top-0 z-50 flex w-full justify-center bg-[#2A1F1A] border-b border-white/10 text-white py-2 px-4 transition-all duration-300"
      >
        <div className="flex max-w-6xl w-full justify-between items-center">
          <Logo
            onClick={(e) => {
              setIsMenuOpen(false);
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-baseline justify-between gap-8">
              <li>
                <NavLink href="/#about">About</NavLink>
              </li>
              <li>
                <NavLink href="/#packages">Packages</NavLink>
              </li>
              <li>
                <NavLink href="/#brows">Brows</NavLink>
              </li>
              <li>
                <NavLink href="/#lashes">Lashes</NavLink>
              </li>
              <li>
                <NavLink href="/#facial-wax">Facial Wax</NavLink>
              </li>
              <li>
                <NavLink href="/#faqs">FAQs</NavLink>
              </li>
              <li>
                <NavLink href="/blog">Blog</NavLink>
              </li>
              <li>
                <BookButton href={BOOK_BUTTON_URL} variant="light" />
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/milenas.beautybar/"
                  target="_blank"
                  className="transition-colors hover:text-[#C4A484]"
                >
                  <SiInstagram className="inline-flex" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#F0DED3]/30 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 text-[#C4A484] transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 text-[#C4A484] transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-all duration-500 ease-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: `${headerBottom}px` }}
      >
        {/* Menu Panel */}
        <div
          className={`w-full h-full bg-[#2A1F1A] text-white transform transition-transform duration-500 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col h-full px-6 py-8">
            <ul className="flex flex-col gap-2">
              {[
                { href: "/#about", label: "About" },
                { href: "/#packages", label: "Packages" },
                { href: "/#brows", label: "Brows" },
                { href: "/#lashes", label: "Lashes" },
                { href: "/#facial-wax", label: "Facial Wax" },
                { href: "/#faqs", label: "FAQs" },
                { href: "/blog", label: "Blog" },
              ].map((item, index) => (
                <li
                  key={item.href}
                  className={`transform transition-all duration-500 ease-out ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen
                      ? `${(index + 1) * 75}ms`
                      : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className="block py-4 text-2xl font-serif text-white hover:text-[#C4A484] transition-colors border-b border-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Book Button & Social */}
            <div
              className={`mt-auto pt-8 flex flex-col gap-6 transform transition-all duration-500 ease-out ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isMenuOpen ? "450ms" : "0ms",
              }}
            >
              <BookButton href={BOOK_BUTTON_URL} variant="light" />

              <div className="flex items-center justify-center gap-4">
                <Link
                  href="https://www.instagram.com/milenas.beautybar/"
                  target="_blank"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#C4A484] transition-colors"
                >
                  <SiInstagram className="w-6 h-6" />
                  <span className="text-sm">@milenas.beautybar</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
