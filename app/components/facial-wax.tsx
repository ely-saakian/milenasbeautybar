import { ServiceList } from "./service-list";

const services = [
  {
    id: "facial-wax",
    name: "Facial Wax",
    title: "Facial Waxing Service",
    description:
      "Achieve smooth, hair-free skin with our gentle facial waxing service. Using premium soft or hard wax depending on the area, we provide precision application for a smooth, long-lasting finish. Perfect for upper lip, chin, sideburns, or full face.",
    href: "https://milenasbeautybar.as.me/?appointmentType=83826653",
    image: {
      src: "/facial-wax-image.png",
      alt: "Facial Wax",
      width: 523,
      height: 364,
    },
    duration: "10-30 min",
    price: "$10-45",
  },
];

export function FacialWax() {
  return (
    <section id="facial-wax" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">Facial Wax</h2>
      <ServiceList services={services} />
    </section>
  );
}
