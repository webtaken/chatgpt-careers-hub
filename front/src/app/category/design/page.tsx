import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; pageSize: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = parseInt(searchParams.pageSize || "10");

  const categories = await getCategories();
  const jobs = await getJobs({ page, pageSize, categoryText: "design" });

  return (
    <main>
      <Header
        title="FIND THE BEST ChatGPT JOBS IN DESIGN"
        categories={categories}
        jobs={jobs}
        page={page}
        pageSize={pageSize}
      />
    </main>
  );
}
