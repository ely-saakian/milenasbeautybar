import { ServiceList } from "./service-list";

const services = [
  {
    title: "Consultation",
    description:
      "Not sure if lash extensions are right for you? Book this complimentary consultation to discuss your lash goals, review styles, check for any sensitivities, and answer your questions. Perfect for first-time clients who want to feel confident before committing to a full set! especially if you'd like to have an allergy test done before committing to service",
    href: "#book",
    image: {
      src: "/lashes-fills-image.png",
      alt: "Consultation",
      width: 523,
      height: 364,
    },
  },
  {
    title: "Extensions",
    description:
      "Classic Full Set, Wispy Full Set, Volume Full Set, Lash Removal",
    href: "#book",
    image: {
      src: "/lashes-extensions-image.png",
      alt: "Extensions",
      width: 523,
      height: 364,
    },
  },
  {
    title: "Fills",
    description: "Classic, Volume, Wispy, 2 Week, 3 Week, 4 Week Fills",
    href: "#book",
    image: {
      src: "/lashes-fills-image.png",
      alt: "Fills - Classic",
      width: 523,
      height: 364,
    },
  },
  {
    title: "Lift",
    description:
      "Enhanced lifted lashes, long-lasting results, nourishment cream, professional treatment",
    href: "#book",
    image: {
      src: "/lashes-lift-image.png",
      alt: "Lift",
      width: 523,
      height: 364,
    },
  },
  {
    title: "Tint",
    description:
      "Long-lasting color, enhances natural lashes, easy application",
    href: "#book",
    image: {
      src: "/lashes-tint-image.png",
      alt: "Tint",
      width: 523,
      height: 364,
    },
  },
];

export function Lashes() {
  return (
    <section id="lashes" className="flex flex-col gap-12">
      <h2 className="text-3xl font-serif font-bold">Lashes</h2>
      <ServiceList services={services} />
    </section>
  );
}
