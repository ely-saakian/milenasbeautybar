import Link from "next/link";

interface LogoProps {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export function Logo({ onClick, className = "" }: LogoProps) {
  const titleClasses = "font-serif text-2xl md:text-3xl tracking-wide";
  const subtitleClasses = "text-[10px] md:text-xs tracking-widest uppercase";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`flex flex-col items-end ${className}`}
    >
      <p className={titleClasses}>MILENA&apos;S</p>
      <p className={subtitleClasses}>beauty bar</p>
    </Link>
  );
}
