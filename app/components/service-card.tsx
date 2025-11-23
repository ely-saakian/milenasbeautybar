import { BookButton } from "./book-button";

interface ServiceCardProps {
  isExpanded: boolean;
  title: string;
  description: string;
  href: string;
  onClick: () => void;
}

export function ServiceCard({
  isExpanded,
  title,
  description,
  href,
  onClick,
}: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 ease-in-out ${
        isExpanded ? "bg-[#F0DED3] rounded-3xl p-4" : ""
      }`}
    >
      <div className="relative min-h-8">
        {/* Collapsed state */}
        <div
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            isExpanded
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <p className="text-lg">{title}</p>
        </div>

        {/* Expanded state */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="flex flex-col items-start gap-4">
            <p className="text-2xl font-bold">{title}</p>
            <p>{description}</p>
            <BookButton href={href} />
          </div>
        </div>
      </div>
    </div>
  );
}
