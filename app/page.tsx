import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Packages } from "./components/packages";
import { Brows } from "./components/brows";
import { Lashes } from "./components/lashes";
import { FacialWax } from "./components/facial-wax";
import { FAQs } from "./components/faqs";
import { Footer } from "./components/footer";
import { StructuredData } from "./components/structured-data";
import { PromoBanner } from "./components/promo-banner";
import { LatestBlog } from "./components/latest-blog";
import { ScrollReveal } from "./components/scroll-reveal";
import { getServices } from "@/lib/get-services";

export const dynamic = "force-static";

export default async function Home() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans text-black gap-8">
      <StructuredData />
      <PromoBanner />
      <Nav />
      <main className="flex flex-col gap-12 md:gap-20 min-h-screen w-full max-w-6xl pb-16">
        <Hero />
        <About />
        <ScrollReveal>
          <LatestBlog />
        </ScrollReveal>
        <ScrollReveal>
          <Packages services={services.packages} />
        </ScrollReveal>
        <ScrollReveal>
          <Brows services={services.brows} />
        </ScrollReveal>
        <ScrollReveal>
          <Lashes services={services.lashes} />
        </ScrollReveal>
        <ScrollReveal>
          <FacialWax services={services.facialWax} />
        </ScrollReveal>
        <ScrollReveal>
          <FAQs />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
