import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";
import {
  handlePaginationParams,
  isNumeric,
  parseNumbersList,
} from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export const metadata: Metadata = {
  title: "Find the Best ChatGPT and LLM Jobs",
  description:
    "Discover curated ChatGPT and LLM roles across categories, locations, and tags.",
  alternates: {
    canonical: `${process.env.AUTH_URL || "https://www.chatgpt-jobs.com"}/`,
  },
  openGraph: {
    title: "Find the Best ChatGPT and LLM Jobs",
    description:
      "Discover curated ChatGPT and LLM roles across categories, locations, and tags.",
    type: "website",
    url: process.env.AUTH_URL || "https://www.chatgpt-jobs.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find the Best ChatGPT and LLM Jobs",
    description:
      "Discover curated ChatGPT and LLM roles across categories, locations, and tags.",
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
    tags: parseNumbersList(searchParams.tags),
    location: parseNumbersList(searchParams.locations),
  });

  const baseUrl = process.env.AUTH_URL || "https://www.chatgpt-jobs.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ChatGPT Jobs",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?title={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header
        categories={categories}
        jobs={jobs}
        page={page}
        pageSize={pageSize}
      />
    </main>
  );
}
