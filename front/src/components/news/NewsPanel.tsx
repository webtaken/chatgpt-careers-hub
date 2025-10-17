"use server";
import { apiNewsletterPostsList, type Post } from "@/client";
import Link from "next/link";
import Image from "next/image";
import { setBasePathToAPI } from "@/lib/utils";

async function fetchPosts(): Promise<Post[]> {
  try {
    setBasePathToAPI();
    // API can return an array or a paginated object depending on backend
    const data = await apiNewsletterPostsList({ pageSize: 20 });
    return data?.results ?? [];
  } catch {
    return [];
  }
}

export default async function NewsPanel() {
  const posts = (await fetchPosts()).filter((p) => p.type === "news");
  if (!posts.length) return null;

  return (
    <section className="space-y-3 bg-white rounded-md border p-4">
      <h3 className="text-sm font-semibold">Latest News</h3>
      <div className="space-y-3">
        {posts.slice(0, 8).map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="flex items-stretch gap-3 rounded-md bg-card hover:bg-accent/10 transition-colors"
          >
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                width={56}
                height={56}
                className="rounded-md object-cover h-14 w-14"
              />
            ) : (
              <div className="h-14 w-14 rounded-md bg-muted" />
            )}
            <div className="min-w-0">
              <p className="text-xs hover:text-primary font-normal">
                {post.title}
              </p>
              {post.published_at ? (
                <p className="text-xs text-muted-foreground">
                  {new Date(post.published_at).toLocaleDateString()}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
