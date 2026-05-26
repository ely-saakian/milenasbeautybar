import { ServiceList } from "./service-list";
import { SectionHeading } from "./section-heading";
import type { Service } from "@/types/services";

interface PackagesProps {
  services: Service[];
}

export function Packages({ services }: PackagesProps) {
  if (services.length === 0) return null;

  return (
    <section id="packages" className="flex flex-col gap-5 px-4">
      <SectionHeading>Packages</SectionHeading>
      <ServiceList services={services} />
    </section>
  );
}
