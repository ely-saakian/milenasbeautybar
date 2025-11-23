import Image from "next/image";

export function About() {
  return (
    <section id="about" className="flex flex-col gap-8">
      <h2 className="text-3xl font-serif font-bold">About</h2>
      <div className="flex flex-row gap-8 items-center">
        <div className="flex flex-1 items-center justify-center">
          <Image
            src="/about-image.png"
            alt="About Image"
            width={300}
            height={300}
            className="w-[300px] h-[300px]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4 leading-normal">
          <p>
            My name is <strong>Milena Saakian</strong> and I truly love what I
            do!
          </p>
          <p>
            I&apos;ve been a <strong>licensed Master Esthetician</strong> since
            2018. After working in the esthetic field, I took a break and spent
            a few years in the medical field. That experience gave me a deeper
            appreciation for both precision and care — values I now bring back
            with me into the beauty world.
          </p>
          <p>
            Today, I&apos;m fully back in the beauty industry, with a focus and
            passion for custom <strong>lash</strong> and <strong>brow</strong>{" "}
            services. My goal is to provide each client with a look that
            enhances their natural beauty while tailoring the experience to
            their individual needs. No two faces are the same — and I believe
            lashes and brows should reflect that!
          </p>
        </div>
      </div>
    </section>
  );
}
