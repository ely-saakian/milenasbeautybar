import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/constants";
import { Logo } from "./logo";
import { BookingLink } from "./booking-link";

const exploreLinks = [
  { href: "/#packages", label: "Packages" },
  { href: "/#brows", label: "Brows" },
  { href: "/#lashes", label: "Lashes" },
  { href: "/#facial-wax", label: "Facial Wax" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: INSTAGRAM_URL,
    label: "Instagram",
    icon: SiInstagram,
  },
  {
    href: "https://www.facebook.com/share/1K1kAsUdd9/?mibextid=wwXIfr",
    label: "Facebook",
    icon: SiFacebook,
  },
  {
    href: "https://www.tiktok.com/@milenasbeautybar",
    label: "TikTok",
    icon: SiTiktok,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center md:items-start">
          <Logo className="text-cream" />
          <p className="mt-3 text-cream/70 max-w-xs leading-relaxed">
            Soft, natural-looking lashes and brows — tailored to you.
          </p>
          <BookingLink className="mt-6 inline-flex items-center rounded-full bg-cream text-espresso px-5 py-2.5 text-sm font-medium hover:bg-cream/90 active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]">
            Book an Appointment
          </BookingLink>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cream/60">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-cream/85 hover:text-cream transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cream/60">
            Visit & follow
          </p>
          <p className="mt-4 text-cream/85">Federal Way, WA</p>
          <p className="mt-1 text-sm text-cream/60 leading-relaxed">
            Address and phone number available upon booking.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="size-11 inline-flex items-center justify-center rounded-full border border-cream/25 hover:bg-cream/10 active:scale-[0.97] transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                <social.icon className="w-[18px] h-[18px]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-xs text-cream/60 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>© {year} Milena&apos;s Beauty Bar. All rights reserved.</p>
          <p>Licensed Master Esthetician · Federal Way, WA</p>
        </div>
      </div>
    </footer>
  );
}
