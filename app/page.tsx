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
import { FloatingHearts } from "./components/floating-hearts";
import { LatestBlog } from "./components/latest-blog";
import { getServices } from "@/lib/get-services";

export const dynamic = "force-static";

export default async function Home() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans text-black gap-8">
      <FloatingHearts />
      <StructuredData />
      <PromoBanner />
      <Nav />
      <main className="flex flex-col gap-8 md:gap-20 min-h-screen w-full max-w-6xl pb-16">
        <Hero />
        <About />
        <LatestBlog />
        <Packages services={services.packages} />
        <Brows services={services.brows} />
        <Lashes services={services.lashes} />
        <FacialWax services={services.facialWax} />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}
