import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

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
  });

  return (
    <main className="">
      <Header
        categories={categories}
        jobs={jobs}
        page={page}
        pageSize={pageSize}
      />
    </main>
  );
}
