import { ServiceList } from "./service-list";
import type { Service } from "@/types/services";

interface PackagesProps {
  services: Service[];
}

export function Packages({ services }: PackagesProps) {
  if (services.length === 0) return null;

  return (
    <section id="packages" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">Packages</h2>
      <ServiceList services={services} />
    </section>
  );
}
