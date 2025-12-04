import { ServiceList } from "./service-list";

const packages = [
  {
    id: "deluxe-package",
    name: "Deluxe Package",
    title: "Deluxe Package",
    description:
      "The ultimate pampering experience! Receive a lash lift, lash tint, brow lamination (including shape and wax), plus aftercare oil to keep your lashes and brows looking gorgeous. Perfect for special occasions or treating yourself to a complete brow and lash transformation.",
    href: "https://milenasbeautybar.as.me/?appointmentType=83827077",
    image: {
      src: "/deluxe-package-image.png",
      alt: "Deluxe Package - Lash Lift, Tint, Brow Lamination",
      width: 523,
      height: 364,
    },
    duration: "3 hours",
    price: "$135.00",
  },
];

export function Packages() {
  return (
    <section id="packages" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">Packages</h2>
      <ServiceList services={packages} />
    </section>
  );
}
