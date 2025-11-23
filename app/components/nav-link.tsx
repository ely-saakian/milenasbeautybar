import Link from "next/link";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[#F0DED3] after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  );
}
