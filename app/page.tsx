import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Brows } from "./components/brows";
import { Lashes } from "./components/lashes";
import { FacialWax } from "./components/facial-wax";
import { FAQs } from "./components/faqs";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center  bg-white font-sans text-black gap-8">
      <div className="flex bg-[#F0DED3] p-2 w-screen items-center justify-center">
        <p>
          LIMITED TIME OFFER! Use code <strong>LASHPROMO</strong> for 50% off
          full sets! Expires Dec. 31st
        </p>
      </div>
      <main className="flex flex-col gap-28 min-h-screen w-full max-w-6xl bg-white pb-16">
        <Nav />
        <Hero />
        <About />
        <Brows />
        <Lashes />
        <FacialWax />
        <FAQs />
      </main>
      <Footer />
    </div>
  );
}
