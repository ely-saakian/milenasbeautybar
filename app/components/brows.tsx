import { ServiceList } from "./service-list";
import { SectionHeading } from "./section-heading";
import type { Service } from "@/types/services";

interface BrowsProps {
  services: Service[];
}

export function Brows({ services }: BrowsProps) {
  if (services.length === 0) return null;

  return (
    <section id="brows" className="flex flex-col gap-5 px-4">
      <SectionHeading>Brows</SectionHeading>
      <ServiceList services={services} />
    </section>
  );
}
