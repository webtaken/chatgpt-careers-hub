import { EditJobForm } from "@/components/jobs/EditJobForm";
import { getJobBySlug } from "@/lib/job-actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { notFound } from "next/navigation";

import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  const job = await getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="px-2 md:px-10 py-6">
      <EditJobForm session={session} job={job} />
    </main>
  );
}
