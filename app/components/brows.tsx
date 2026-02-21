import { ServiceList } from "./service-list";
import type { Service } from "@/types/services";

interface BrowsProps {
  services: Service[];
}

export function Brows({ services }: BrowsProps) {
  if (services.length === 0) return null;

  return (
    <section id="brows" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">Brows</h2>
      <ServiceList services={services} />
    </section>
  );
}
