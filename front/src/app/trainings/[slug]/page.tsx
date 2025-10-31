import { apiNewsletterPostsBySlugRetrieve } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
  out = out.replace(/\\\"/g, '"');
  out = out.replace(/\\\\/g, "\\");
  return out;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  setBasePathToAPI();

  const post = await apiNewsletterPostsBySlugRetrieve({
    slug: params.slug,
  }).catch(() => null);

  if (!post) {
    return {
      title: "Training Not Found",
      description: "The requested training could not be found.",
    };
  }

  const description = post.body_md
    ? unescapeEscapedMarkdown(post.body_md)
        .replace(/[#*`]/g, "")
        .substring(0, 160)
    : unescapeEscapedMarkdown(post.body)
        .replace(/<[^>]*>/g, "")
        .substring(0, 160);

  const publishedDate = post.published_at
    ? new Date(post.published_at)
    : new Date();
  const modifiedDate = post.updated_at
    ? new Date(post.updated_at)
    : publishedDate;

  return {
    title: `${post.title} | ChatGPT Jobs Trainings`,
    description:
      description || `Explore training: ${post.title} on ChatGPT Jobs.`,
    keywords: [
      "ChatGPT jobs",
      "AI jobs",
      "training",
      "learning",
      post.title.toLowerCase(),
    ],
    authors: [{ name: "ChatGPT Jobs" }],
    creator: "ChatGPT Jobs",
    publisher: "ChatGPT Jobs",
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(
      process.env.AUTH_URL || "https://www.chatgpt-jobs.com"
    ),
    alternates: {
      canonical: `https://www.chatgpt-jobs.com/trainings/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description:
        description || `Explore training: ${post.title} on ChatGPT Jobs.`,
      url: `https://www.chatgpt-jobs.com/trainings/${params.slug}`,
      siteName: "ChatGPT Jobs",
      images: post.image_url
        ? [
            {
              url: post.image_url,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "/brand-icon.png",
              width: 1200,
              height: 630,
              alt: "ChatGPT Jobs",
            },
          ],
      locale: "en_US",
      type: "article",
      publishedTime: publishedDate.toISOString(),
      modifiedTime: modifiedDate.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        description || `Explore training: ${post.title} on ChatGPT Jobs.`,
      images: post.image_url ? [post.image_url] : ["/brand-icon.png"],
      creator: "@chatgptjobs",
      site: "@chatgptjobs",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function TrainingDetailPage({ params }: Params) {
  setBasePathToAPI();
  const post = await apiNewsletterPostsBySlugRetrieve({
    slug: params.slug,
  }).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-muted/30">
        <section className="max-w-3xl mx-auto px-4 py-4">
          <div className="mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/trainings">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Trainings
              </Link>
            </Button>
          </div>
          <Card className="bg-white border shadow-sm">
            <CardHeader>
              {post.external_url ? (
                <a
                  href={post.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1 className="text-3xl font-bold hover:text-primary">
                    {post.title}
                  </h1>
                </a>
              ) : (
                <h1 className="text-3xl font-bold hover:text-primary">
                  {post.title}
                </h1>
              )}
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

              {post.body_md ? (
                <article className="prose prose-sm max-w-none text-muted-foreground">
                  <ReactMarkdown
                    disallowedElements={["img", "h1", "h2", "h3"]}
                    remarkPlugins={[remarkGfm]}
                  >
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
    </>
  );
}
