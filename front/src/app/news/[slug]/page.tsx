import { apiNewsletterPostsBySlugRetrieve } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
type Params = {
  params: { slug: string };
};

function unescapeEscapedMarkdown(escaped: string | undefined | null): string {
  if (!escaped) return "";
  let out = escaped;
  out = out.replace(/\\n/g, "\n");
  out = out.replace(/\\r/g, "\r");
  out = out.replace(/\\t/g, "\t");
  out = out.replace(/\\f/g, "\f");
  // \b in regex is word boundary; avoid regex and use string replace
  out = out.split("\\b").join("\b");
  out = out.replace(/\\"/g, '"');
  out = out.replace(/\\\\/g, "\\");
  return out;
}

export default async function NewsDetailPage({ params }: Params) {
  setBasePathToAPI();
  const post = await apiNewsletterPostsBySlugRetrieve({
    slug: params.slug,
  }).catch(() => null);

  if (!post) {
    return (
      <main className="min-h-screen bg-muted/30">
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">News not found</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <section className="max-w-3xl mx-auto px-4 py-4">
        <div className="mb-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/news">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
            </Link>
          </Button>
        </div>
        <Card className="bg-white border shadow-sm">
          <CardHeader>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {post.published_at ? (
              <p className="text-sm text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString()}
              </p>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-6">
            {post.image_url ? (
              <div>
                <Image
                  src={post.image_url}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="rounded-md object-cover w-full h-auto"
                />
              </div>
            ) : null}

            {/* Prefer markdown when available */}
            {post.body_md ? (
              <article className="prose prose-sm max-w-none text-muted-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {unescapeEscapedMarkdown(post.body_md)}
                </ReactMarkdown>
              </article>
            ) : (
              <article
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: unescapeEscapedMarkdown(post.body),
                }}
              />
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
