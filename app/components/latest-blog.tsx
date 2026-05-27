import readingTime from "reading-time";
import Link from "next/link";
import client from "@/tina/__generated__/client";
import { BlogpostCard } from "./blog/blogpost-card";

async function getLatestPost() {
  try {
    const postsResponse = await client.queries.postConnection({
      sort: "date",
    });

    const edges = postsResponse.data?.postConnection?.edges;
    if (!edges || edges.length === 0) return null;

    // Sorted ascending by date, so the last item is the newest
    const latest = edges[edges.length - 1]?.node;
    if (!latest) return null;

    const bodyString = JSON.stringify(latest.body);
    const timeToRead = readingTime(bodyString).text;

    const formattedDate = latest.date
      ? new Date(latest.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    return {
      slug: latest._sys.filename,
      title: latest.title,
      description: latest.description ?? "",
      date: formattedDate,
      thumbnail: latest.thumbnail ?? "",
      readingTime: timeToRead,
    };
  } catch (error) {
    console.error("Error fetching latest post from Tina:", error);
    return null;
  }
}

export async function LatestBlog() {
  const post = await getLatestPost();
  if (!post) return null;

  return (
    <section className="py-16 sm:py-20 bg-cream-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
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
            className="inline-flex items-center gap-1.5 text-sm font-medium text-espresso underline underline-offset-4 decoration-espresso/30 hover:decoration-espresso transition"
          >
            View all posts <span aria-hidden>→</span>
          </Link>
        </div>
        <Link href={`/blog/${post.slug}`} className="block">
          <BlogpostCard
            title={post.title}
            description={post.description}
            date={post.date}
            image={post.thumbnail}
            readingTime={post.readingTime}
          />
        </Link>
      </div>
    </section>
  );
}
