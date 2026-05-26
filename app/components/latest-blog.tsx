import readingTime from "reading-time";
import Link from "next/link";
import client from "@/tina/__generated__/client";
import { BlogpostCard } from "./blog/blogpost-card";
import { SectionHeading } from "./section-heading";

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
    <section className="px-4 w-full">
      <div className="flex items-center justify-between mb-5">
        <SectionHeading>Latest from the Blog</SectionHeading>
        <Link href="/blog" className="text-sm text-[#C4A484] hover:underline">
          View all posts
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
    </section>
  );
}
