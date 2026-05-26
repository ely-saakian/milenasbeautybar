import { ServiceList } from "./service-list";
import { SectionHeading } from "./section-heading";
import type { Service } from "@/types/services";

interface FacialWaxProps {
  services: Service[];
}

export function FacialWax({ services }: FacialWaxProps) {
  if (services.length === 0) return null;

  return (
    <section id="facial-wax" className="flex flex-col gap-5 px-4">
      <SectionHeading>Facial Wax</SectionHeading>
      <ServiceList services={services} />
    </section>
  );
}
