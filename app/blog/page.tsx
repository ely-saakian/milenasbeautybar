import readingTime from "reading-time";
import Link from "next/link";
import client from "@/tina/__generated__/client";
import { Main } from "@/app/components/blog/main";
import { BlogpostCard } from "@/app/components/blog/blogpost-card";

async function getBlogPosts() {
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
          : null;

        return {
          slug: node._sys.filename,
          frontmatter: {
            title: node.title,
            description: node.description,
            date: formattedDate,
            thumbnail: node.thumbnail,
            readingTime: timeToRead,
          },
        };
      }) ?? [];

    // Filter out null values and reverse for newest first
    return posts
      .filter((post): post is NonNullable<typeof post> => post !== null)
      .reverse();
  } catch (error) {
    console.error("Error fetching posts from Tina:", error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <Main>
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-espresso">
          Blog
        </h1>
        <p className="text-espresso/70">
          Tips, tutorials, and insights about beauty and self-care.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-espresso/50 text-center py-10">
          No blog posts yet. Check back soon!
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <BlogpostCard
                title={post.frontmatter.title}
                description={post.frontmatter.description ?? ""}
                date={post.frontmatter.date ?? ""}
                image={post.frontmatter.thumbnail ?? "/placeholder.jpg"}
                readingTime={post.frontmatter.readingTime}
              />
            </Link>
          ))}
        </div>
      )}
    </Main>
  );
}
