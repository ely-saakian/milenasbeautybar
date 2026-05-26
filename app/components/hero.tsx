import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./section-heading";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="-mt-8 w-full bg-[#2A1F1A] px-4 py-12 md:py-20 lg:py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-12">
        <div className="flex flex-1 flex-col gap-6 md:gap-7 text-left">
          <SectionHeading tone="tan">Federal Way, WA</SectionHeading>

          <h1
            id="hero-heading"
            className="font-serif text-4xl md:text-5xl font-bold leading-tight text-white"
          >
            Soft, natural-looking lashes &amp; brows
          </h1>

          <p className="max-w-[60ch] text-base md:text-lg text-gray-300 leading-relaxed">
            Master Esthetician with medical-field experience, specializing in
            safe, precise lash and brow services tailored to your face.
          </p>

          <ul className="flex flex-col gap-2 text-gray-200">
            {[
              "Licensed Master Esthetician since 2018",
              "Custom lash & brow designs — never one-size-fits-all",
              "Private studio",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#C4A484]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center md:items-center gap-3 sm:gap-4 pt-1">
            <Link
              href="https://milenasbeautybar.as.me/schedule/13baf9e3"
              aria-label="Book a lash or brow appointment"
              className="group/book relative inline-flex w-fit overflow-hidden rounded-full border border-white bg-white px-6 py-3 text-base font-medium text-black transition-colors duration-300 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A484] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A1F1A]"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute left-0 top-0 h-full w-0 bg-[#F0DED3] transition-[width] duration-300 ease-in-out group-hover/book:w-full" />
              </span>
              <span className="absolute inset-0 -z-10 rounded-full bg-white transition-colors duration-300 group-hover/book:bg-[#F0DED3]" />
              <span className="relative z-10">Book an Appointment</span>
            </Link>

            <Link
              href="/#packages"
              className="inline-flex w-fit items-center gap-1 rounded-full px-3 py-2 text-base font-medium text-gray-200 underline-offset-4 transition-colors hover:text-[#C4A484] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A484] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A1F1A]"
            >
              View Services &amp; Pricing
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <p className="text-sm text-gray-400">
            <span className="font-semibold text-white">5.0</span>
            <span aria-hidden="true" className="text-[#C4A484]">
              {" "}
              ★{" "}
            </span>
            on{" "}
            <Link
              href="https://maps.app.goo.gl/NFJACRstzS8q67gM8"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#F0DED3] underline underline-offset-4 transition-colors hover:text-[#C4A484] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A484] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A1F1A] rounded-sm"
            >
              Google
            </Link>{" "}
            &mdash; 40+ happy clients
          </p>
        </div>

        <aside
          className="w-2/3 md:w-2/5 shrink-0"
          aria-label="Portrait of Milena"
        >
          <div className="relative aspect-square overflow-hidden rounded-full">
            <Image
              src="/about-image.png"
              alt="Milena, Licensed Master Esthetician in Federal Way"
              fill
              priority
              sizes="(min-width: 1152px) 480px, (min-width: 768px) 40vw, 66vw"
              className="object-cover"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
