import { apiNewsletterPostsList, type Post } from "@/client";
import Link from "next/link";
import Image from "next/image";
import { setBasePathToAPI } from "@/lib/utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

function getExcerptFromHtml(html: string | undefined | null, maxLength = 180) {
  if (!html) return "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

async function fetchNews(): Promise<Post[]> {
  try {
    setBasePathToAPI();
    const data = await apiNewsletterPostsList({ pageSize: 30 });
    const posts = data?.results ?? [];
    return posts.filter((p) => p.type === "news");
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const posts = await fetchNews();

  return (
    <main className="min-h-screen bg-muted/30">
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Latest News</h1>

        {!posts.length ? (
          <p className="text-muted-foreground">No news available.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="bg-background border rounded-md p-4">
                <Link
                  href={`/news/${post.slug}`}
                  className="flex gap-4 items-start hover:bg-accent/10 rounded-md transition-colors p-2 -m-2"
                >
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover h-20 w-20"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-md bg-muted" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold mb-1 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.published_at ? (
                      <p className="text-xs text-muted-foreground mb-2">
                        {new Date(post.published_at).toLocaleDateString()}
                      </p>
                    ) : null}
                    {post.body ? (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {getExcerptFromHtml(post.body)}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
