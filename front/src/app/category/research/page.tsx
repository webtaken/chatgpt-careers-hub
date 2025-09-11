import type { Metadata } from "next";
import HeroSection from "@/components/commons/HeroSection";
import BrandLogos from "@/components/commons/BrandLogos";
import SocialLinks from "@/components/commons/SocialLinks";
import SubscriptionSection from "@/components/commons/SubscriptionSection";
import JobsFiltersSection from "@/components/commons/JobsFiltersSection";
import JobsList from "@/components/jobs/JobsList";
import { getCategories, getJobs } from "@/lib/job-actions";
import { handlePaginationParams, parseNumbersList } from "@/lib/utils";

// Type definition for search params
interface PagesParams {
  tags?: string;
  title?: string;
  page?: string;
  pageSize?: string;
  locations?: string;
}

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Explore ChatGPT and LLM jobs in Research, from AI labs to user studies.",
  alternates: {
    canonical: `${process.env.AUTH_URL}/category/research`,
  },
  openGraph: {
    title: "Research Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Research, from AI labs to user studies.",
    type: "website",
    url: `${
      process.env.AUTH_URL || "https://www.chatgpt-jobs.com"
    }/category/research`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Research, from AI labs to user studies.",
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
    categoryText: "research",
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
        name: "Research",
        item: `${baseUrl}/category/research`,
      },
    ],
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection title="FIND THE BEST ChatGPT JOBS IN RESEARCH" />
      <BrandLogos />
      <SocialLinks />
      <SubscriptionSection />
      <JobsFiltersSection categories={categories} />
      {jobs && <JobsList jobs={jobs} page={page} pageSize={pageSize} />}
    </main>
  );
}
