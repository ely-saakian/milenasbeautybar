export function Hero() {
  return (
    <section className="relative flex flex-col gap-8 items-center text-center px-4 py-10 overflow-hidden">
      <div className="flex flex-col gap-6 items-center max-w-2xl">
        <div className="inline-flex items-center gap-2">
          <span className="w-8 h-px bg-[#C4A484]" />
          <span className="text-xs font-semibold text-[#C4A484] uppercase tracking-widest">
            Federal Way, WA
          </span>
          <span className="w-8 h-px bg-[#C4A484]" />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif">
          Lash & Brow Services
        </h1>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Custom lash extensions and brow services tailored to enhance your
          natural beauty.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <div className="px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-[#F0DED3]">
            <span className="text-sm font-medium text-gray-700">
              ✨ Licensed since 2018
            </span>
          </div>
          <div className="px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-[#F0DED3]">
            <span className="text-sm font-medium text-gray-700">
              💫 Custom Services
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
