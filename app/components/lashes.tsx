import { ServiceList } from "./service-list";

const LASH_FILL_TYPES = [
  {
    id: "classic",
    name: "Classic",
    description:
      "Traditional 1:1 ratio with a natural, defined look. Perfect for those who prefer a timeless aesthetic with subtle enhancement.",
    duration: "45-60 min",
    price: "$50-60",
    href: "https://milenasbeautybar.as.me/?appointmentType=category:Lash%20Fills%20-%20Classic",
  },
  {
    id: "volume",
    name: "Volume",
    description:
      "Fuller, dramatic appearance with multiple lightweight extensions per natural lash. Ideal for adding glamorous volume and dimension.",
    duration: "60-75 min",
    price: "$65-80",
    href: "https://milenasbeautybar.as.me/?appointmentType=category:Lash%20Fills%20-%20Volume",
  },
  {
    id: "wispy",
    name: "Wispy",
    description:
      "Trendy hybrid style combining classic and volume for a feathery, textured look. Great for those wanting a modern, editorial appearance.",
    duration: "60-70 min",
    price: "$60-75",
    href: "https://milenasbeautybar.as.me/?appointmentType=category:Lash%20Fills%20-%20Wispy",
  },
];

const LASH_EXTENSION_TYPES = [
  {
    id: "half-set",
    name: "Half Set",
    description:
      "A half set is a 40–60% lash coverage that gives a soft, lifted ‘lash-cluster’ look—perfect for vacations or events—and lasts about 7–10 days depending on care and natural lash growth.",
    duration: "1 hour 45 min",
    price: "$75.00",
    href: "https://milenasbeautybar.as.me/?appointmentType=86404163",
  },
  {
    id: "classic",
    name: "Classic",
    description:
      "The perfect choice for a natural, mascara-like look! Classic lash extensions are applied using a 1:1 technique — one extension to one natural lash — to enhance your eyes with subtle length and definition. Ideal for clients who want an everyday, effortless style. I offer three different styles, customized to your eye shape.",
    duration: "2 hours",
    price: "$100.00",
    href: "https://milenasbeautybar.as.me/?appointmentType=83828435",
  },
  {
    id: "volume",
    name: "Volume",
    description:
      "Fluffy, and full! Volume lashes are created by applying lightweight fans (2–6 extensions per natural lash) for a soft, glamorous look. A perfect choice if you love extra fullness while keeping lashes lightweight and comfortable. I offer multiple styles that will be tailored to your eye shape.",
    duration: "3 hours",
    price: "$165.00",
    href: "https://milenasbeautybar.as.me/?appointmentType=83828550",
  },
  {
    id: "wispy",
    name: "Wispy",
    description:
      "A blend of classics, spikes, and volume techniques for the best custom look. Wispy lashes give you a soft, textured look with added fullness and dimension. Great for clients who want a little more drama than classic but less than volume.",
    duration: "2 hours 30 min",
    price: "$130.00",
    href: "https://milenasbeautybar.as.me/?appointmentType=83828506",
  },
];

const services = [
  {
    id: "consultation",
    name: "Consultation",
    title: "Lash Consultation",
    description:
      "Not sure if lash extensions are right for you? Book this complimentary consultation to discuss your lash goals, review styles, check for any sensitivities, and answer your questions. Perfect for first-time clients who want to feel confident before committing to a full set!",
    href: "https://milenasbeautybar.as.me/?appointmentType=83824594",
    image: {
      src: "/lashes-consultation-image.jpg",
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
      "Enhance your natural lashes with our premium extensions. Choose from Classic, Wispy, or Volume styles for a glamorous, full look that lasts 4-6 weeks.",
    href: "#book",
    image: {
      src: "/lashes-extensions-image.png",
      alt: "Lash Extensions",
      width: 523,
      height: 364,
    },
    duration: "1 hour 45 min - 3 hours",
    price: "$150-250",
    types: LASH_EXTENSION_TYPES,
    typesLabel: "Choose Your Extension Type",
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
    types: LASH_FILL_TYPES,
    typesLabel: "Choose Your Fill Type",
  },
  {
    id: "lift",
    name: "Lift",
    title: "Lash Lift",
    description:
      "Experience enhanced lifted lashes with our professional lash lift treatment. Enjoy long-lasting results that make your natural lashes appear longer and more defined. Our treatment includes nourishment cream to keep your lashes healthy and beautiful for weeks to come.",
    href: "https://milenasbeautybar.as.me/Lashlift",
    image: {
      src: "/lashes-lift-image.png",
      alt: "Lash Lift",
      width: 523,
      height: 364,
    },
    duration: "45-60 min",
    price: "$75",
  },
  {
    id: "tint",
    name: "Tint",
    title: "Professional Lash Tint",
    description:
      "Darken and define your natural lashes with our professional tinting service. Great for those with light-colored lashes who want more definition without daily mascara application.",
    href: "https://milenasbeautybar.as.me/?appointmentType=84141448",
    image: {
      src: "/lashes-tint-image.png",
      alt: "Lash Tint",
      width: 523,
      height: 364,
    },
    duration: "20-30 min",
    price: "$25",
  },
  {
    id: "removal",
    name: "Removal",
    title: "Professional Lash Removal",
    description:
      "Safe and gentle removal of lash extensions from your natural lashes. Whether you have a partial set or full extensions, we use professional-grade remover to carefully dissolve the adhesive without damaging your natural lashes. Timing varies based on the application: 20-30 minutes for partial sets, 30-45 minutes for a typical full set, and 45+ minutes for heavy applications or extensions applied elsewhere.",
    href: "https://milenasbeautybar.as.me/?appointmentType=83828784",
    image: {
      src: "/lashes-extensions-removal.png",
      alt: "Lash Removal",
      width: 523,
      height: 364,
    },
    duration: "20-45 min",
    price: "$35",
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
