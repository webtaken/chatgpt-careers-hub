import { authOptions } from "@/auth";
import { getJobBySlug } from "@/lib/job-actions";
import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";
import React from "react";
import { JobDetailDialog } from "@/components/jobs/JobDetailDialog";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
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
