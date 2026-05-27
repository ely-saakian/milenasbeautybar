import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const BULLETS = [
  "Licensed Master Esthetician since 2018",
  "Custom designs — never one-size-fits-all",
  "Private, appointment-only studio",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cream/60 via-background to-background"
      />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 -z-10 h-[420px] w-[420px] rounded-full bg-cream blur-3xl opacity-70"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.25em] text-espresso/70">
            <span className="h-px w-8 bg-espresso/40" />
            Federal Way, WA
          </p>

          <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-espresso">
            Soft, natural-looking
            <span className="block italic text-espresso/90">
              lashes &amp; brows
            </span>
            <span className="block">tailored to you.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-espresso/75 leading-relaxed">
            I&apos;m Milena — a Licensed Master Esthetician since 2018 with a
            background in the medical field. Every service is custom, safe, and
            precise. No two faces are the same, so nothing I do is
            one-size-fits-all.
          </p>

          <ul className="mt-8 space-y-3 text-sm sm:text-base text-espresso/85">
            {BULLETS.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 rounded-full bg-espresso"
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="https://milenasbeautybar.as.me/schedule/13baf9e3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-espresso px-7 py-3.5 text-sm sm:text-base font-medium text-cream hover:bg-espresso-soft transition"
            >
              Book an Appointment
            </a>
            <Link
              href="/#packages"
              className="inline-flex items-center rounded-full border border-espresso/30 px-7 py-3.5 text-sm sm:text-base font-medium text-espresso hover:bg-cream transition"
            >
              View Services &amp; Pricing
            </Link>
          </div>

          <a
            href="https://maps.app.goo.gl/NFJACRstzS8q67gM8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-espresso/75 hover:text-espresso transition"
          >
            <span className="flex text-espresso" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  width={16}
                  height={16}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </span>
            <span className="font-medium">5.0 on Google</span>
            <span className="text-espresso/50">— 40+ happy clients</span>
          </a>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto aspect-square w-[78%] sm:w-[60%] lg:w-full max-w-md">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-cream translate-x-4 translate-y-4"
            />
            <div className="relative h-full w-full overflow-hidden rounded-full shadow-xl ring-1 ring-espresso/10">
              <Image
                src="/about-image.jpg"
                alt="Portrait of Milena, Licensed Master Esthetician"
                fill
                priority
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 60vw, 78vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -left-4 sm:-left-8 bottom-6 bg-background/95 backdrop-blur rounded-2xl shadow-lg px-4 py-3 text-xs sm:text-sm">
              <p className="font-serif text-espresso text-base sm:text-lg leading-tight">
                Milena
              </p>
              <p className="text-espresso/60">Master Esthetician · est. 2018</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
