import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
} from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { Logo } from "./logo";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#brows", label: "Brows" },
  { href: "#lashes", label: "Lashes" },
  { href: "#facial-wax", label: "Facial Wax" },
  { href: "#faqs", label: "FAQs" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/milenas.beautybar/",
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
  return (
    <footer className="w-full bg-[#F0DED3]">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Column 1 - Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Logo />
            <p className="mt-4 text-gray-700">Federal Way, WA</p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg mb-4 tracking-wide">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-[#C4A484] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 - Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg mb-4 tracking-wide">Connect</h3>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Milena's Beauty Bar on ${social.label}`}
                  className="text-gray-700 hover:text-[#C4A484] transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="text-sm text-gray-600 italic text-center md:text-left">
              Address and phone number available upon booking
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C4A484]/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Milena&apos;s Beauty Bar. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
