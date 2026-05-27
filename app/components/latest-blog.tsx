import readingTime from "reading-time";
import Link from "next/link";
import client from "@/tina/__generated__/client";
import { BlogpostCard } from "./blog/blogpost-card";

type LatestPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  readingTime: string;
};

async function getLatestPosts(limit = 3): Promise<LatestPost[]> {
  try {
    const postsResponse = await client.queries.postConnection({
      sort: "date",
    });

    const posts =
      postsResponse.data?.postConnection?.edges?.map((edge) => {
        const node = edge?.node;
        if (!node) return null;

        const bodyString = JSON.stringify(node.body);
        const timeToRead = readingTime(bodyString).text;

        const formattedDate = node.date
          ? new Date(node.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "";

        return {
          slug: node._sys.filename,
          title: node.title,
          description: node.description ?? "",
          date: formattedDate,
          thumbnail: node.thumbnail ?? "",
          readingTime: timeToRead,
        };
      }) ?? [];

    return posts
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .reverse()
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching latest posts from Tina:", error);
    return [];
  }
}

export async function LatestBlog() {
  const posts = await getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-cream-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-espresso/60">
              Journal
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-espresso">
              Latest from the blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-espresso underline underline-offset-4 decoration-espresso/30 transition hover:decoration-espresso"
          >
            View all posts
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <BlogpostCard
                  layout="grid"
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  image={post.thumbnail}
                  readingTime={post.readingTime}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
