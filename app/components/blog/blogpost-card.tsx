import Image from "next/image";

interface BlogpostCardProps {
  title: string;
  image?: string;
  date: string;

  description: string;
  readingTime: string;
}

export function BlogpostCard({
  title,
  image,
  date,
  description,
  readingTime,
}: BlogpostCardProps) {
  const hasImage = image && image.length > 0;

  return (
    <article className="flex flex-col md:flex-row rounded-xl shadow-lg shadow-sand bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {hasImage ? (
        <div className="h-[200px] md:h-auto md:w-[300px] md:min-w-[300px] relative">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 300px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-[200px] md:h-auto md:w-[300px] md:min-w-[300px] bg-linear-to-br from-[#F0DED3] to-[#C4A484] flex items-center justify-center">
          <span className="text-white/80 text-4xl font-serif">
            {title.charAt(0)}
          </span>
        </div>
      )}
      <div className="flex flex-col space-y-4 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-900">
          {title}
        </h2>
        <p className="text-gray-600 line-clamp-2">{description}</p>
        <p className="font-light italic text-gray-500 text-sm">
          {date} · {readingTime}
        </p>
      </div>
    </article>
  );
}
