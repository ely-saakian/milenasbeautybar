import Link from "next/link";

interface BookButtonProps {
  href: string;
  variant?: "dark" | "light";
}

export function BookButton({ href, variant = "dark" }: BookButtonProps) {
  const isLight = variant === "light";

  const linkClasses = isLight
    ? "group/book relative inline-flex w-fit overflow-hidden rounded-full border border-white bg-white px-5 py-2 text-black transition-colors duration-300 hover:text-black"
    : "group/book relative inline-flex w-fit overflow-hidden rounded-full border border-black bg-black px-5 py-2 text-white transition-colors duration-300 hover:text-black";

  const baseLayerClasses = isLight
    ? "absolute inset-0 rounded-full bg-white group-hover/book:bg-[#F0DED3] transition-colors duration-300 -z-10"
    : "absolute inset-0 rounded-full bg-black group-hover/book:bg-[#F0DED3] transition-colors duration-300 -z-10";

  return (
    <Link href={href} className={linkClasses}>
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute left-0 top-0 h-full w-0 bg-[#F0DED3] transition-[width] duration-300 ease-in-out group-hover/book:w-full"></span>
      </span>
      <span className={baseLayerClasses}></span>
      <span className="relative z-10">Book</span>
    </Link>
  );
}
