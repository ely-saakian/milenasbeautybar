import Image from "next/image";
import type { ServiceSectionMeta } from "@/lib/service-sections";
import type { FlatService } from "@/lib/get-services";

interface ServiceSectionProps {
  section: ServiceSectionMeta;
  services: FlatService[];
  alt?: boolean;
}

function parseSingleDollarValue(v?: string): number | null {
  if (!v) return null;
  const m = v.replace(/,/g, "").match(/^\s*\$?(\d+(?:\.\d+)?)\s*$/);
  return m ? Number(m[1]) : null;
}

function formatSavings(regularPrice: string, price: string): number | null {
  const regular = parseSingleDollarValue(regularPrice);
  const current = parseSingleDollarValue(price);
  if (regular == null || current == null || regular <= current) return null;
  return Math.round(regular - current);
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
      className={`py-20 sm:py-24 ${alt ? "bg-cream/40" : ""}`}
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
            <div className="group mt-6 overflow-hidden rounded-2xl aspect-[4/5] hidden lg:block relative">
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                loading="lazy"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          <ul className="lg:col-span-8 divide-y divide-border/70">
            {services.map((s) => {
              const savings =
                s.regularPrice != null
                  ? formatSavings(s.regularPrice, s.price)
                  : null;

              return (
                <li key={s.id} className="py-6 first:pt-0 group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex flex-col gap-2 sm:gap-1.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h3 className="font-serif text-2xl sm:text-[1.65rem] text-espresso">
                          {s.name}
                        </h3>
                        {s.tags?.length ? (
                          <ul className="flex flex-wrap gap-1.5">
                            {s.tags.map((t) => (
                              <li
                                key={t}
                                className="rounded-full border border-espresso/20 bg-cream/60 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-espresso/80"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end shrink-0">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-espresso/60">{s.duration}</span>
                        <span aria-hidden className="text-espresso/30">
                          ·
                        </span>
                        {s.regularPrice ? (
                          <span className="text-espresso/40 line-through">
                            {s.regularPrice}
                          </span>
                        ) : null}
                        <span className="font-medium text-espresso">
                          {s.price}
                        </span>
                      </div>
                      {savings != null ? (
                        <span className="mt-1 inline-flex rounded-full bg-espresso px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cream">
                          Save ${savings}
                        </span>
                      ) : null}
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
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
