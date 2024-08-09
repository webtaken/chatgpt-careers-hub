import { JobsListResponse } from "@/client";
import { TriangleAlertIcon } from "lucide-react";
import { generateUniqueId } from "@/lib/utils";
import JobListCard from "./JobListCard";
import { PaginationWithLinks } from "../ui/pagination-with-links";
import Link from "next/link";

export default function JobsList({
  jobs,
  page,
  pageSize,
}: {
  jobs: JobsListResponse;
  page: number;
  pageSize: number;
}) {
  return (
    <div className="flex flex-col py-4 px-2 sm:px-5 md:px-20 space-y-2">
      {jobs.count === 0 && (
        <div className="flex my-10 flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Oops, no jobs were found.
            </h1>
            <p className="mt-4 text-muted-foreground">
              We couldn&apos;t find the item you were searching for. Please try
              a different search or navigate to another page.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      )}
      {jobs.results.map((job) => (
        <JobListCard key={generateUniqueId()} job={job} />
      ))}
      {jobs.count > 0 && (
        <PaginationWithLinks
          page={page}
          pageSize={pageSize}
          totalCount={jobs.count}
        />
      )}
    </div>
  );
}
