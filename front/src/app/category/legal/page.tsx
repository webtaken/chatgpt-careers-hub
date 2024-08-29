import type { Metadata } from "next";
import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";

export const metadata: Metadata = {
  title: "Legal",
  alternates: {
    canonical: `${process.env.NEXTAUTH_URL}/category/legal`,
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: PagesParams;
}) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = parseInt(searchParams.pageSize || "10");

  const categories = await getCategories();
  const jobs = await getJobs({
    page,
    pageSize,
    locationLocation: searchParams.location,
    categoryText: "legal",
  });

  return (
    <main>
      <Header
        title="FIND THE BEST ChatGPT JOBS IN LEGAL ASSISTANCE AND CONSULTING."
        categories={categories}
        jobs={jobs}
        page={page}
        pageSize={pageSize}
      />
    </main>
  );
}
