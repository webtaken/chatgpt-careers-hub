import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";

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
    categoryText: "writing",
  });

  return (
    <main>
      <Header
        title="FIND THE BEST ChatGPT JOBS IN WRITING"
        categories={categories}
        jobs={jobs}
        page={page}
        pageSize={pageSize}
      />
    </main>
  );
}
