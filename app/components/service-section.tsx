import Image from "next/image";
import type { ServiceSectionMeta } from "@/lib/service-sections";
import type { FlatService } from "@/lib/get-services";

interface ServiceSectionProps {
  section: ServiceSectionMeta;
  services: FlatService[];
  alt?: boolean;
}

export function ServiceSection({
  section,
  services,
  alt = false,
}: ServiceSectionProps) {
  if (services.length === 0) return null;

  return (
    <section
      id={section.id}
      className={`scroll-mt-24 py-20 sm:py-24 ${alt ? "bg-cream/40" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <p className="text-xs uppercase tracking-[0.25em] text-espresso/60">
              Services
            </p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-espresso">
              {section.title}
            </h2>
            <p className="mt-4 text-espresso/70 leading-relaxed">
              {section.blurb}
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl aspect-[4/5] hidden lg:block relative">
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>

          <ul className="lg:col-span-8 divide-y divide-border/70">
            {services.map((s) => (
              <li key={s.id} className="py-6 first:pt-0 group">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <h3 className="font-serif text-2xl sm:text-[1.65rem] text-espresso">
                    {s.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-espresso/60">{s.duration}</span>
                    <span aria-hidden className="text-espresso/30">
                      ·
                    </span>
                    <span className="font-medium text-espresso">{s.price}</span>
                  </div>
                </div>
                <p className="mt-2 text-espresso/70 leading-relaxed max-w-2xl">
                  {s.description}
                </p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-espresso underline underline-offset-4 decoration-espresso/30 hover:decoration-espresso transition"
                >
                  Book {s.name}
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
