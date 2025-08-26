import { EditJobForm } from "@/components/jobs/EditJobForm";
import { getJobBySlug } from "@/lib/job-actions";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
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
