import Image from "next/image";

export function Hero() {
  return (
    <section className="flex flex-col gap-8 items-center">
      <div className="flex flex-col justify-center items-start self-start">
        <h1 className="text-6xl font-serif">Lash & Brow Services</h1>
        <p className="text-xl font-light">Federal Way, WA</p>
      </div>

      <Image
        src="/hero-image.png"
        alt="Hero Image"
        width={1000}
        height={600}
        className="w-full h-auto rounded-3xl"
      />
    </section>
  );
}
