import { ApiCategoriesListResponse } from "@/client";
import { JobsFilterForm } from "../jobs/JobsFilterForm";

interface JobsFiltersSectionProps {
  categories?: ApiCategoriesListResponse;
}

export default function JobsFiltersSection({
  categories,
}: JobsFiltersSectionProps) {
  return (
    <div className="space-y-4">
      {categories && (
        <div className="rounded-md border bg-card p-4">
          <JobsFilterForm variant="sidebar" />
        </div>
      )}
    </div>
  );
}
