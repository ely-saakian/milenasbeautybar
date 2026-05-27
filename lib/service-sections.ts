/**
 * Section metadata for the home-page service listings.
 *
 * Mirrors the structure of Lovable's `src/lib/site-data.ts` `sections` array
 * (Packages / Brows / Lashes / Facial Wax). Blurbs are copied verbatim from
 * the Lovable reference design.
 *
 * Images: chosen from existing assets in `public/` to be category-appropriate.
 *   - packages    → `/deluxe-package-image.png` (Deluxe Package is the only package)
 *   - brows       → `/brows-lamination-image.png` (most visually distinctive brow service)
 *   - lashes      → `/lashes-extensions-image.png` (representative lash service)
 *   - facial-wax  → `/facial-wax-image.png` (direct category match)
 *
 * If none of these exist at build time, swap to `/about-image.png` as a
 * neutral fallback.
 */

export type ServiceSectionMeta = {
  id: "packages" | "brows" | "lashes" | "facial-wax";
  category: "packages" | "brows" | "lashes" | "facialWax";
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
};

export const serviceSections: ServiceSectionMeta[] = [
  {
    id: "packages",
    category: "packages",
    title: "Packages",
    blurb:
      "Bundled treatments designed to give you a complete, balanced look in one visit.",
    image: "/package-image.PNG",
    imageAlt: "Packages at Milena's Beauty Bar",
  },
  {
    id: "brows",
    category: "brows",
    title: "Brows",
    blurb:
      "Considered shaping and soft tinting that respects your natural arch.",
    image: "/brows-image.PNG",
    imageAlt: "Brow services at Milena's Beauty Bar",
  },
  {
    id: "lashes",
    category: "lashes",
    title: "Lashes",
    blurb:
      "Soft, weightless lashes tailored to your eye shape — never one-size-fits-all.",
    image: "/lashes-image.PNG",
    imageAlt: "Lash services at Milena's Beauty Bar",
  },
  {
    id: "facial-wax",
    category: "facialWax",
    title: "Facial Wax",
    blurb:
      "Gentle facial waxing using techniques that respect sensitive skin.",
    image: "/facial-wax-image.jpeg",
    imageAlt: "Facial wax services at Milena's Beauty Bar",
  },
];
