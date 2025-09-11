import { Suspense } from "react";
import { CategoriesListResponse } from "@/client";
import { JobsFilterForm } from "../jobs/JobsFilterForm";
import { TopTags, TopTagsSkeleton } from "./TopTags";

interface JobsFiltersSectionProps {
  categories?: CategoriesListResponse;
}

export default function JobsFiltersSection({ categories }: JobsFiltersSectionProps) {
  return (
    <>
      {categories && (
        <div className="px-8 md:px-20">
          <JobsFilterForm categories={categories} />
        </div>
      )}

      <div className="px-8 md:px-20">
        <Suspense fallback={<TopTagsSkeleton />}>
          <TopTags />
        </Suspense>
      </div>
    </>
  );
}
