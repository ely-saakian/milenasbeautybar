import { ServiceList } from "./service-list";

const services = [
  {
    id: "lamination",
    name: "Lamination",
    title: "Brow Lamination",
    description:
      "Achieve beautifully sculpted, fluffy brows with our professional brow lamination treatment. This semi-permanent styling solution tames unruly hairs and creates a fuller, more defined brow shape that lasts up to 6-8 weeks.",
    href: "https://milenasbeautybar.as.me/?appointmentType=83825757",
    image: {
      src: "/brows-lamination-image.png",
      alt: "Brow Lamination",
      width: 523,
      height: 364,
    },
    duration: "45-60 min",
    price: "$65",
  },
  {
    id: "wax",
    name: "Wax",
    title: "Brow Waxing",
    description:
      "Get perfectly defined brows with our gentle waxing service. Using premium soft wax, we shape your brows to complement your facial features while removing unwanted hair for a clean, polished look.",
    href: "https://milenasbeautybar.as.me/?appointmentType=83826463",
    image: {
      src: "/brows-wax-image.png",
      alt: "Brow Waxing",
      width: 523,
      height: 364,
    },
    duration: "15-20 min",
    price: "$15",
  },
  {
    id: "tint",
    name: "Tint",
    title: "Brow Tinting",
    description:
      "Enhance your natural brows with our professional tinting service. Add depth and definition with long-lasting color that fills in sparse areas and gives your brows a fuller appearance.",
    href: "https://milenasbeautybar.as.me/?appointmentType=83825812",
    image: {
      src: "/brows-tint-image.png",
      alt: "Brow Tinting",
      width: 523,
      height: 364,
    },
    duration: "15-20 min",
    price: "$25",
  },
];

export function Brows() {
  return (
    <section id="brows" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">Brows</h2>
      <ServiceList services={services} />
    </section>
  );
}
