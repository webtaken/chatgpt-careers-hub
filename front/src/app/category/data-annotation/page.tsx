import type { Metadata } from "next";
import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";
import { handlePaginationParams, parseNumbersList } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export const metadata: Metadata = {
  title: "Data Annotation",
  description:
    "Explore ChatGPT and LLM jobs in Data Annotation, from labeling to quality assurance.",
  alternates: {
    canonical: `${process.env.AUTH_URL}/category/data-annotation`,
  },
  openGraph: {
    title: "Data Annotation Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Data Annotation, from labeling to quality assurance.",
    type: "website",
    url: `${
      process.env.AUTH_URL || "https://www.chatgpt-jobs.com"
    }/category/data-annotation`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Annotation Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Data Annotation, from labeling to quality assurance.",
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
    categoryText: "data annotation",
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
        name: "Data Annotation",
        item: `${baseUrl}/category/data-annotation`,
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
        title="FIND THE BEST ChatGPT JOBS IN DATA ANNOTATION"
        categories={categories}
        jobs={jobs}
        page={page}
        pageSize={pageSize}
      />
    </main>
  );
}
