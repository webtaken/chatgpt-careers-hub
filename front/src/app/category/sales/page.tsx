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
  title: "Sales",
  description:
    "Explore ChatGPT and LLM jobs in Sales, from AI-driven outreach to solutions consulting.",
  alternates: {
    canonical: `${process.env.AUTH_URL}/category/sales`,
  },
  openGraph: {
    title: "Sales Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Sales, from AI-driven outreach to solutions consulting.",
    type: "website",
    url: `${
      process.env.AUTH_URL || "https://www.chatgpt-jobs.com"
    }/category/sales`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Sales, from AI-driven outreach to solutions consulting.",
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
    categoryText: "sales",
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
        name: "Sales",
        item: `${baseUrl}/category/sales`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection title="FIND THE BEST ChatGPT JOBS IN SALES" />
      <BrandLogos />
      <SocialLinks />
      <SubscriptionSection />
      <JobsFiltersSection categories={categories} />
      {jobs && <JobsList jobs={jobs} page={page} pageSize={pageSize} />}
    </main>
  );
}
