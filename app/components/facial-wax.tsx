import { ServiceList } from "./service-list";

const services = [
  {
    title: "Wax Correction",
    description: "Soft or hard wax, precision application, smooth finish",
    href: "#book",
    image: {
      src: "/facial-wax-image.png",
      alt: "Facial Wax",
      width: 523,
      height: 364,
    },
  },
];

export function FacialWax() {
  return (
    <section id="facial-wax" className="flex flex-col gap-12">
      <h2 className="text-3xl font-serif font-bold">Facial Wax</h2>
      <ServiceList services={services} />
    </section>
  );
}
