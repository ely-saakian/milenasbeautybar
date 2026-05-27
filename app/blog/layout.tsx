import { Nav } from "@/app/components/nav";
import { Footer } from "@/app/components/footer";
import { PromoBanner } from "@/app/components/promo-banner";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen font-sans text-black">
      <PromoBanner />
      <Nav />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
