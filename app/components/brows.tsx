import { ServiceList } from "./service-list";

const services = [
  {
    title: "Lamination",
    description: "Sculpted brows, nourishment cream",
    href: "#book",
    image: {
      src: "/brows-lamination-image.png",
      alt: "Brows Lamination",
      width: 523,
      height: 364,
    },
  },
  {
    title: "Wax",
    description: "Defined brows with soft wax",
    href: "#book",
    image: {
      src: "/brows-wax-image.png",
      alt: "Brows Wax",
      width: 523,
      height: 364,
    },
  },
  {
    title: "Tint",
    description: "Long-lasting color, enhances natural brows, easy application",
    href: "#book",
    image: {
      src: "/brows-tint-image.png",
      alt: "Brows Tint",
      width: 523,
      height: 364,
    },
  },
];

export function Brows() {
  return (
    <section id="brows" className="flex flex-col gap-8">
      <h2 className="text-3xl font-serif font-bold">Brows</h2>
      <ServiceList services={services} />
    </section>
  );
}
