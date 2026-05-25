import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="flex flex-col gap-8 max-w-[65ch] px-4">
      <div className="overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex flex-col gap-5">
              <SectionHeading>Your Esthetician</SectionHeading>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                Hi, I&apos;m Milena!
              </h3>

              <div className="flex flex-col gap-4 text-gray-600 leading-relaxed">
                <p>
                  I truly love what I do! I&apos;ve been a{" "}
                  <strong className="text-gray-800">
                    licensed Master Esthetician
                  </strong>{" "}
                  since 2018. After working in the esthetic field, I took a
                  break and spent a few years in the medical field. That
                  experience gave me a deeper appreciation for both precision
                  and care — values I now bring back with me into the beauty
                  world.
                </p>
                <p>
                  Today, I&apos;m fully back in the beauty industry, with a
                  focus and passion for custom{" "}
                  <strong className="text-gray-800">lash</strong> and{" "}
                  <strong className="text-gray-800">brow</strong> services. My
                  goal is to provide each client with a look that enhances their
                  natural beauty while tailoring the experience to their
                  individual needs.
                </p>
                <p className="text-[#C4A484] font-medium italic">
                  No two faces are the same — and I believe lashes and brows
                  should reflect that!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
