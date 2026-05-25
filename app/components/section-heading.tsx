import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  tone?: "espresso" | "tan";
  className?: string;
}

export function SectionHeading({
  children,
  tone = "espresso",
  className = "",
}: SectionHeadingProps) {
  const textColor = tone === "tan" ? "text-[#C4A484]" : "text-[#2A1F1A]";
  const lineColor = tone === "tan" ? "bg-[#C4A484]" : "bg-[#2A1F1A]";

  return (
    <h2
      className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest ${textColor} ${className}`}
    >
      <span aria-hidden="true" className={`w-8 h-px ${lineColor}`} />
      <span>{children}</span>
    </h2>
  );
}
