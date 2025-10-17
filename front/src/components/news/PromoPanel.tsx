"use server";
import { apiNewsletterPostsList, type Post } from "@/client";
import Link from "next/link";
import { setBasePathToAPI } from "@/lib/utils";

async function fetchPosts(): Promise<Post[]> {
  try {
    setBasePathToAPI();
    const data = await apiNewsletterPostsList({ pageSize: 20 });
    return data?.results ?? [];
  } catch {
    return [];
  }
}

export default async function PromoPanel() {
  const posts = (await fetchPosts()).filter((p) => p.type === "promo");
  if (!posts.length) return null;

  return (
    <section className="space-y-3 bg-white rounded-md border p-4">
      <h3 className="text-sm font-semibold">Promotions</h3>
      <div className="space-y-3">
        {posts.slice(0, 4).map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="block rounded-md bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
          >
            <p className="text-xs font-medium">{post.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
