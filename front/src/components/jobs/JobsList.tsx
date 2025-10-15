import { ApiJobsListListResponse } from "@/client";
import { TriangleAlertIcon } from "lucide-react";
import JobListCard from "./JobListCard";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import Link from "next/link";

export default function JobsList({
  jobs,
  page,
  pageSize,
}: {
  jobs: ApiJobsListListResponse;
  page?: number;
  pageSize?: number;
}) {
  return (
    <div className="flex flex-col space-y-3">
      {jobs.count === 0 && (
        <div className="flex my-10 flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              No jobs match your search
            </h1>
            <p className="mt-4 text-muted-foreground">
              Try broadening your keywords, removing filters, or exploring other
              categories.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Browse all jobs
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col divide-y divide-border rounded-md border bg-card">
        {jobs.results.map((job) => (
          <JobListCard key={job.id} job={job} />
        ))}
      </div>
      {jobs.count > 0 && (
        <PaginationWithLinks
          page={page || 1}
          pageSize={pageSize || 10}
          totalCount={jobs.count}
        />
      )}
    </div>
  );
}
