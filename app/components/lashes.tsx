import { ServiceList } from "./service-list";

const LASH_FILL_TYPES = [
  {
    id: "classic",
    name: "Classic",
    description:
      "Traditional 1:1 ratio with a natural, defined look. Perfect for those who prefer a timeless aesthetic with subtle enhancement.",
    duration: "45-60 min",
    price: "$50-60",
  },
  {
    id: "volume",
    name: "Volume",
    description:
      "Fuller, dramatic appearance with multiple lightweight extensions per natural lash. Ideal for adding glamorous volume and dimension.",
    duration: "60-75 min",
    price: "$65-80",
  },
  {
    id: "wispy",
    name: "Wispy",
    description:
      "Trendy hybrid style combining classic and volume for a feathery, textured look. Great for those wanting a modern, editorial appearance.",
    duration: "60-70 min",
    price: "$60-75",
  },
];

const services = [
  {
    id: "consultation",
    name: "Consultation",
    title: "Lash Consultation",
    description:
      "Not sure if lash extensions are right for you? Book this complimentary consultation to discuss your lash goals, review styles, check for any sensitivities, and answer your questions. Perfect for first-time clients who want to feel confident before committing to a full set!",
    href: "#book",
    image: {
      src: "/lashes-fills-image.png",
      alt: "Lash Consultation",
      width: 523,
      height: 364,
    },
    duration: "15-20 min",
    price: "Free",
  },
  {
    id: "extensions",
    name: "Extensions",
    title: "Full Lash Extensions",
    description:
      "Enhance your natural lashes with our premium synthetic extensions. Choose from Classic, Wispy, or Volume styles for a glamorous, full look that lasts 4-6 weeks. Each extension is carefully applied by our certified technicians.",
    href: "#book",
    image: {
      src: "/lashes-extensions-image.png",
      alt: "Lash Extensions",
      width: 523,
      height: 364,
    },
    duration: "2-3 hours",
    price: "$150-250",
  },
  {
    id: "fills",
    name: "Fills",
    title: "Lash Fill Service",
    description:
      "Keep your extensions looking fresh with regular fills. We replace any lost lashes and ensure perfect retention. Recommended every 2-3 weeks for optimal results. Choose your preferred fill type below.",
    href: "#book",
    image: {
      src: "/lashes-fills-image.png",
      alt: "Lash Fills",
      width: 523,
      height: 364,
    },
    duration: "45-75 min",
    price: "$50-80",
    fillTypes: LASH_FILL_TYPES,
  },
  {
    id: "lift",
    name: "Lift",
    title: "Lash Lift & Curl",
    description:
      "Get beautifully lifted lashes with our professional lash lift treatment. This semi-permanent curl enhances your natural lashes, making them appear longer and more defined without the need for extensions.",
    href: "#book",
    image: {
      src: "/lashes-lift-image.png",
      alt: "Lash Lift",
      width: 523,
      height: 364,
    },
    duration: "45-60 min",
    price: "$65-85",
  },
  {
    id: "tint",
    name: "Tint",
    title: "Professional Lash Tint",
    description:
      "Darken and define your natural lashes with our professional tinting service. Great for those with light-colored lashes who want more definition without daily mascara application.",
    href: "#book",
    image: {
      src: "/lashes-tint-image.png",
      alt: "Lash Tint",
      width: 523,
      height: 364,
    },
    duration: "20-30 min",
    price: "$25-35",
  },
];

export function Lashes() {
  return (
    <section id="lashes" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">Lashes</h2>
      <ServiceList services={services} />
    </section>
  );
}
