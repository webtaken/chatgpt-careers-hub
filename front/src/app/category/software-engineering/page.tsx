import type { Metadata } from "next";
import HeroSection from "@/components/commons/HeroSection";
import SocialLinks from "@/components/commons/SocialLinks";
import SubscriptionSection from "@/components/commons/SubscriptionSection";
import JobsFiltersSection from "@/components/commons/JobsFiltersSection";
import JobsList from "@/components/jobs/JobsList";
import { getCategories, getJobs } from "@/lib/job-actions";
import { handlePaginationParams, parseNumbersList } from "@/lib/utils";
import CategoriesNavigator from "@/components/commons/CategoriesNavigator";
import { TopTagsBar } from "@/components/commons/TopTags";

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
  title: "Software Engineering",
  description:
    "Explore ChatGPT and LLM jobs in Software Engineering, from backend to full-stack.",
  alternates: {
    canonical: `${process.env.AUTH_URL}/category/software-engineering`,
  },
  openGraph: {
    title: "Software Engineering Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Software Engineering, from backend to full-stack.",
    type: "website",
    url: `${
      process.env.AUTH_URL || "https://www.chatgpt-jobs.com"
    }/category/software-engineering`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineering Jobs - ChatGPT Jobs",
    description:
      "Explore ChatGPT and LLM jobs in Software Engineering, from backend to full-stack.",
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
    categoryText: "software engineering",
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
        name: "Software Engineering",
        item: `${baseUrl}/category/software-engineering`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection title="FIND THE BEST ChatGPT JOBS IN SOFTWARE ENGINEERING" />
      <CategoriesNavigator />
      <SocialLinks />
      <SubscriptionSection />
      <section className="px-2 sm:px-5 md:px-20 py-6 space-y-6">
        <TopTagsBar />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-4 space-y-4">
              <JobsFiltersSection categories={categories} />
            </div>
          </aside>
          <div className="md:col-span-8 lg:col-span-9">
            {jobs ? (
              <JobsList jobs={jobs} page={page} pageSize={pageSize} />
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <h2 className="text-2xl font-semibold mb-2">No jobs found</h2>
                <p className="text-muted-foreground mb-4">
                  We couldn&apos;t find any jobs for your query. Please try
                  again with different filters or keywords.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
