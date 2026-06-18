import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { FAQs } from "./components/faqs";
import { Footer } from "./components/footer";
import { StructuredData } from "./components/structured-data";
import { PromoBanner } from "./components/promo-banner";
import { LatestBlog } from "./components/latest-blog";
import { ScrollReveal } from "./components/scroll-reveal";
import { ServiceSection } from "./components/service-section";
import { CustomerReviews } from "./components/customer-reviews";
import { getFlatServices } from "@/lib/get-services";
import { getFeaturedReviews } from "@/lib/get-reviews";
import { serviceSections } from "@/lib/service-sections";

export const dynamic = "force-static";

export default async function Home() {
  const [flat, reviews] = await Promise.all([
    getFlatServices(),
    getFeaturedReviews(3),
  ]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <StructuredData />
      <PromoBanner />
      <Nav />
      <main>
        <Hero />
        <ScrollReveal>
          <CustomerReviews reviews={reviews} />
        </ScrollReveal>
        {serviceSections.map((s, i) => (
          <ServiceSection
            key={s.id}
            section={s}
            services={flat[s.category]}
            alt={i % 2 === 1}
          />
        ))}
        <ScrollReveal>
          <LatestBlog />
        </ScrollReveal>
        <ScrollReveal>
          <FAQs />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
