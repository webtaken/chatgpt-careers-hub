import type { Metadata } from "next";
import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";
import { handlePaginationParams, parseNumbersList } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export const metadata: Metadata = {
  title: "Data Annotation",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL}/category/data-annotation`,
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

  return (
    <main>
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
