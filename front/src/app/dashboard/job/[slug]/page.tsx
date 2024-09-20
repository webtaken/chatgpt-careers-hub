import { getJobBySlug } from "@/lib/job-actions";
import { notFound } from "next/navigation";

import React from "react";
import { JobDetailDialog } from "@/components/jobs/JobDetailDialog";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function Page({ params }: { params: { slug: string } }) {
  const job = await getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="px-2 md:px-10 py-6">
      <JobDetailDialog job={job} />
    </main>
  );
}
