import type { Metadata } from "next";
import JobsList from "@/components/jobs/JobsList";
import { getCategories, getJobs } from "@/lib/job-actions";
import { handlePaginationParams, parseNumbersList } from "@/lib/utils";
import {
  TrendingTagsPanel,
  TopTagsPanelSkeleton,
} from "@/components/commons/TopTags";
import CategoriesNavigator from "@/components/commons/CategoriesNavigator";
import { JobsFilterCard } from "@/components/jobs/JobsFilterCard";
import { Suspense } from "react";
import NewsPanel from "@/components/news/NewsPanel";
import PromoPanel from "@/components/news/PromoPanel";
import TrainingPanel from "@/components/news/TrainingPanel";
import {
  LeftPanelSkeleton,
  RightPanelSkeleton,
} from "@/components/news/NewsPanelsSkeleton";

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

      {/* Mobile: Stack vertically, Desktop: 3-column layout */}
      <section className="px-2 sm:px-5 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left sidebar - Hidden on mobile, visible on large screens */}
          <aside className="hidden lg:block w-full lg:w-1/5 space-y-4">
            <Suspense fallback={<TopTagsPanelSkeleton />}>
              <TrendingTagsPanel />
            </Suspense>
            <Suspense fallback={<LeftPanelSkeleton />}>
              <NewsPanel />
            </Suspense>
          </aside>

          {/* Main content area */}
          <div className="w-full lg:w-3/5 space-y-4">
            <JobsFilterCard jobsCount={jobs?.count ?? 0} />
            <CategoriesNavigator />
            <div className="space-y-2">
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

          {/* Right sidebar - Hidden on mobile, visible on large screens */}
          <aside className="hidden lg:block w-full lg:w-1/5 space-y-4">
            <Suspense fallback={<RightPanelSkeleton />}>
              <PromoPanel />
              <TrainingPanel />
            </Suspense>
          </aside>
        </div>

        {/* Mobile-only sections - Show below main content on small screens */}
        <div className="lg:hidden space-y-4 mt-6">
          <Suspense fallback={<TopTagsPanelSkeleton />}>
            <TrendingTagsPanel />
          </Suspense>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense fallback={<LeftPanelSkeleton />}>
              <NewsPanel />
            </Suspense>
            <div className="space-y-4">
              <Suspense fallback={<RightPanelSkeleton />}>
                <PromoPanel />
                <TrainingPanel />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
