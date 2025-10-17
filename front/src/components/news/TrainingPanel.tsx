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

export default async function TrainingPanel() {
  const posts = (await fetchPosts()).filter((p) => p.type === "training");
  if (!posts.length) return null;

  return (
    <section className="space-y-3 bg-white rounded-md border p-4">
      <h3 className="text-sm font-semibold">Training</h3>
      <div className="space-y-3">
        {posts.slice(0, 6).map((post) => (
          <Link
            key={post.id}
            href={post.external_url || `/news/${post.slug}`}
            className="block bg-card hover:bg-accent transition-colors"
          >
            <p className="text-xs font-medium">{post.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
