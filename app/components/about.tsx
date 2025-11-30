import Image from "next/image";

export function About() {
  return (
    <section id="about" className="flex flex-col gap-8 px-4">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image */}
          <div className="w-1/2 md:w-2/5 aspect-square md:aspect-auto">
            <Image
              src="/about-image.png"
              alt="Milena Saakian - Master Esthetician"
              width={500}
              height={500}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex-1 pt-6 md:p-8 lg:p-10 flex flex-col justify-center bg-linear-to-br from-white to-[#F0DED3]/10">
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-px bg-[#C4A484]" />
                <span className="text-xs font-semibold text-[#C4A484] uppercase tracking-widest">
                  Your Esthetician
                </span>
              </div>

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

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="px-4 py-2 bg-[#F0DED3]/40 rounded-full">
                  <span className="text-sm font-medium text-gray-700">
                    ✨ Licensed since 2018
                  </span>
                </div>
                <div className="px-4 py-2 bg-[#F0DED3]/40 rounded-full">
                  <span className="text-sm font-medium text-gray-700">
                    🎯 Precision & Care
                  </span>
                </div>
                <div className="px-4 py-2 bg-[#F0DED3]/40 rounded-full">
                  <span className="text-sm font-medium text-gray-700">
                    💫 Custom Services
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
