import Header from "@/components/commons/Header";
import { getCategories, getJobs } from "@/lib/job-actions";
import {
  handlePaginationParams,
  isNumeric,
  parseNumbersList,
} from "@/lib/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

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
    tags: parseNumbersList(searchParams.tags),
    location: parseNumbersList(searchParams.locations),
  });

  return (
    <main>
      <Header
        categories={categories}
        jobs={jobs}
        page={page}
        pageSize={pageSize}
      />
    </main>
  );
}
