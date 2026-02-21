import { ServiceList } from "./service-list";
import type { Service } from "@/types/services";

interface LashesProps {
  services: Service[];
}

export function Lashes({ services }: LashesProps) {
  if (services.length === 0) return null;

  return (
    <section id="lashes" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">Lashes</h2>
      <ServiceList services={services} />
    </section>
  );
}
