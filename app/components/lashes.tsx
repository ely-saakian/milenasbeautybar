import { ServiceList } from "./service-list";
import { SectionHeading } from "./section-heading";
import type { Service } from "@/types/services";

interface LashesProps {
  services: Service[];
}

export function Lashes({ services }: LashesProps) {
  if (services.length === 0) return null;

  return (
    <section id="lashes" className="flex flex-col gap-5 px-4">
      <SectionHeading>Lashes</SectionHeading>
      <ServiceList services={services} />
    </section>
  );
}
