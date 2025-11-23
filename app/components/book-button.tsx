import Link from "next/link";

interface BookButtonProps {
  href: string;
}

export function BookButton({ href }: BookButtonProps) {
  return (
    <Link
      href={href}
      className="group relative inline-block self-start overflow-hidden rounded-full border border-black bg-black px-5 py-2 text-white transition-colors duration-300 hover:text-black"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute left-0 top-0 h-full w-0 bg-[#F0DED3] transition-[width] duration-300 ease-in-out group-hover:w-full"></span>
      </span>
      <span className="absolute inset-0 rounded-full bg-black group-hover:bg-[#F0DED3] transition-colors duration-300 -z-10"></span>
      <span className="relative z-10">Book</span>
    </Link>
  );
}
