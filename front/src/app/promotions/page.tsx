import { apiNewsletterPostsList, type Post } from "@/client";
import Link from "next/link";
import Image from "next/image";
import { setBasePathToAPI } from "@/lib/utils";

export const revalidate = 0;
export const dynamic = "force-dynamic";

function getExcerptFromHtml(html: string | undefined | null, maxLength = 160) {
  if (!html) return "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

async function fetchPromotions(): Promise<Post[]> {
  try {
    setBasePathToAPI();
    const data = await apiNewsletterPostsList({
      pageSize: 30,
      type: "promo",
    });
    return data?.results ?? [];
  } catch {
    return [];
  }
}

export default async function PromotionsPage() {
  const posts = await fetchPromotions();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Deals, discounts, and partner offers for the community.
          </p>
        </div>

        {!posts.length ? (
          <p className="text-muted-foreground">No promotions available.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id} className="group">
                <Link
                  href={`/promotions/${post.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm ring-1 ring-border/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {post.image_url ? (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-primary-foreground shadow-sm">
                        Promo
                      </span>
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full bg-muted rounded-t-xl" />
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-base font-semibold leading-snug line-clamp-2">
                      {post.title}
                    </h2>
                    {post.published_at ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(post.published_at).toLocaleDateString()}
                      </p>
                    ) : null}
                    {post.body ? (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {getExcerptFromHtml(post.body)}
                      </p>
                    ) : null}
                    <div className="mt-5">
                      <span className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors group-hover:bg-primary/90">
                        View details
                      </span>
                    </div>
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
