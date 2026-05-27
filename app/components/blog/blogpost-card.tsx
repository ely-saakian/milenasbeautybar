import Image from "next/image";

interface BlogpostCardProps {
  title: string;
  image?: string;
  date: string;
  description: string;
  readingTime: string;
  layout?: "list" | "grid";
}

export function BlogpostCard({
  title,
  image,
  date,
  description,
  readingTime,
  layout = "list",
}: BlogpostCardProps) {
  const hasImage = image && image.length > 0;
  const isGrid = layout === "grid";

  const articleClass = isGrid
    ? "flex h-full flex-row lg:flex-col"
    : "flex flex-col md:flex-row";

  const imageWrapperClass = isGrid
    ? "relative min-h-[7.5rem] w-28 shrink-0 lg:h-44 lg:min-h-0 lg:w-full"
    : "relative h-[200px] md:h-auto md:w-[300px] md:min-w-[300px]";

  const imageSizes = isGrid
    ? "(min-width: 1024px) 33vw, 7rem"
    : "(min-width: 768px) 300px, 100vw";

  const contentClass = isGrid
    ? "flex flex-1 flex-col justify-center gap-2 p-4 sm:p-5 lg:gap-3 lg:p-6"
    : "flex flex-col space-y-4 p-6 md:p-8";

  const titleClass = isGrid
    ? "line-clamp-2 font-serif text-base font-medium text-espresso sm:text-lg lg:text-xl lg:line-clamp-3"
    : "font-serif text-xl font-medium text-espresso md:text-2xl";

  const placeholderClass = `${imageWrapperClass} flex items-center justify-center bg-gradient-to-br from-cream to-espresso/30`;

  return (
    <article
      className={`${articleClass} group overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-lg shadow-espresso/10`}
    >
      {hasImage ? (
        <div className={`${imageWrapperClass} overflow-hidden`}>
          <Image
            src={image}
            alt={title}
            fill
            sizes={imageSizes}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      ) : (
        <div className={placeholderClass}>
          <span className="font-serif text-3xl text-cream/80 lg:text-4xl">
            {title.charAt(0)}
          </span>
        </div>
      )}
      <div className={contentClass}>
        <h2 className={titleClass}>{title}</h2>
        <p
          className={`line-clamp-2 text-espresso/70 ${isGrid ? "text-sm" : ""}`}
        >
          {description}
        </p>
        <p className="text-sm font-light italic text-espresso/50">
          {date} · {readingTime}
        </p>
      </div>
    </article>
  );
}
