import Link from "next/link";

interface LogoProps {
  size?: "default" | "responsive";
  isScrolled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Logo({
  size = "default",
  isScrolled = false,
  onClick,
  className = "",
}: LogoProps) {
  const titleClasses =
    size === "responsive"
      ? `font-serif tracking-wide transition-all duration-300 ${
          isScrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
        }`
      : "font-serif text-3xl tracking-wide";

  const subtitleClasses =
    size === "responsive"
      ? `tracking-widest uppercase transition-all duration-300 ${
          isScrolled ? "text-[10px] md:text-xs" : "text-xs md:text-base"
        }`
      : "text-sm tracking-widest uppercase";

  return (
    <Link
      href="#"
      onClick={onClick}
      className={`flex flex-col items-end ${className}`}
    >
      <p className={titleClasses}>MILENA&apos;S</p>
      <p className={subtitleClasses}>beauty bar</p>
    </Link>
  );
}
