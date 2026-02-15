import Image from "next/image";
import { BackButton } from "./back-button";

interface ArticleLayoutProps {
  title: string;
  description?: string | null;
  date?: string | null;
  thumbnail?: string | null;
  readingTime?: string;
  children: React.ReactNode;
}

export function ArticleLayout({
  title,
  description,
  date,
  thumbnail,
  readingTime,
  children,
}: ArticleLayoutProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <BackButton />
      <article className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-4 px-5 py-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600">{description}</p>
          )}
          {(formattedDate || readingTime) && (
            <p className="font-light italic text-gray-500">
              {formattedDate}
              {formattedDate && readingTime ? " · " : ""}
              {readingTime}
            </p>
          )}
        </div>
        {thumbnail && (
          <div className="h-[250px] sm:h-[400px] lg:h-[500px] relative">
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="prose prose-lg mx-auto px-5 py-10 max-w-none">
          {children}
        </div>
      </article>
    </>
  );
}
