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
  out = out.replace(/\\"/g, '"');
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
      title: "News Article Not Found",
      description: "The requested news article could not be found.",
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
    title: `${post.title} | ChatGPT Jobs News`,
    description:
      description ||
      `Read the latest news about ${post.title} on ChatGPT Jobs.`,
    keywords: [
      "ChatGPT jobs",
      "AI jobs",
      "remote work",
      "tech careers",
      "newsletter",
      post.title.toLowerCase(),
    ],
    authors: [{ name: "ChatGPT Jobs" }],
    creator: "ChatGPT Jobs",
    publisher: "ChatGPT Jobs",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(
      process.env.AUTH_URL || "https://www.chatgpt-jobs.com"
    ),
    alternates: {
      canonical: `https://www.chatgpt-jobs.com/news/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description:
        description ||
        `Read the latest news about ${post.title} on ChatGPT Jobs.`,
      url: `https://www.chatgpt-jobs.com/news/${params.slug}`,
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
        description ||
        `Read the latest news about ${post.title} on ChatGPT Jobs.`,
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
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },
  };
}

export default async function NewsDetailPage({ params }: Params) {
  setBasePathToAPI();
  const post = await apiNewsletterPostsBySlugRetrieve({
    slug: params.slug,
  }).catch(() => null);

  if (!post) {
    notFound();
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.body_md
      ? unescapeEscapedMarkdown(post.body_md)
          .replace(/[#*`]/g, "")
          .substring(0, 160)
      : unescapeEscapedMarkdown(post.body)
          .replace(/<[^>]*>/g, "")
          .substring(0, 160),
    image: post.image_url ? [post.image_url] : ["/brand-icon.png"],
    datePublished: post.published_at || new Date().toISOString(),
    dateModified:
      post.updated_at || post.published_at || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "ChatGPT Jobs",
      url: process.env.AUTH_URL || "https://www.chatgpt-jobs.com",
    },
    publisher: {
      "@type": "Organization",
      name: "ChatGPT Jobs",
      url: process.env.AUTH_URL || "https://www.chatgpt-jobs.com",
      logo: {
        "@type": "ImageObject",
        url: `${
          process.env.AUTH_URL || "https://www.chatgpt-jobs.com"
        }/brand-icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.AUTH_URL || "https://www.chatgpt-jobs.com"}/news/${
        params.slug
      }`,
    },
    url: `${process.env.AUTH_URL || "https://www.chatgpt-jobs.com"}/news/${
      params.slug
    }`,
    articleSection: "Technology",
    keywords: [
      "ChatGPT jobs",
      "AI jobs",
      "remote work",
      "tech careers",
      "newsletter",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
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

              {/* Prefer markdown when available */}
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
