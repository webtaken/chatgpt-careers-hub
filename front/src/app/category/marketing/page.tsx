import type { Metadata } from "next";
import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";
import { handlePaginationParams, parseNumbersList } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export const metadata: Metadata = {
  title: "Marketing",
  description:
    "Explore ChatGPT and LLM jobs in Marketing, from growth to content strategy.",
  alternates: {
    canonical: `${process.env.AUTH_URL}/category/marketing`,
  },
  openGraph: {
    title: "Marketing Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Marketing, from growth to content strategy.",
    type: "website",
    url: `${
      process.env.AUTH_URL || "https://www.chatgpt-jobs.com"
    }/category/marketing`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Marketing, from growth to content strategy.",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: PagesParams;
}) {
  const { page, pageSize } = handlePaginationParams(searchParams);
  const categories = await getCategories();
  const jobs = await getJobs({
    page,
    pageSize,
    title: searchParams.title,
    categoryText: "marketing",
    tags: parseNumbersList(searchParams.tags),
    location: parseNumbersList(searchParams.locations),
  });

  const baseUrl = process.env.AUTH_URL || "https://www.chatgpt-jobs.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marketing",
        item: `${baseUrl}/category/marketing`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header
        title="FIND THE BEST ChatGPT JOBS IN MARKETING"
        categories={categories}
        jobs={jobs}
        page={page}
        pageSize={pageSize}
      />
    </main>
  );
}
