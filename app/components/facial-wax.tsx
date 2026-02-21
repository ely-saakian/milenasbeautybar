import { ServiceList } from "./service-list";
import type { Service } from "@/types/services";

interface FacialWaxProps {
  services: Service[];
}

export function FacialWax({ services }: FacialWaxProps) {
  if (services.length === 0) return null;

  return (
    <section id="facial-wax" className="flex flex-col gap-8 px-4">
      <h2 className="text-3xl font-serif font-bold">Facial Wax</h2>
      <ServiceList services={services} />
    </section>
  );
}
