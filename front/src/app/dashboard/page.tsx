import UserJobsList from "@/components/jobs/UserJobsList";
import { getUserJobs } from "@/lib/job-actions";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function Page() {
  const jobs = await getUserJobs();

  return (
    <>
      <h1 className="text-center text-3xl font-semibold mt-10">
        Your posted jobs
      </h1>
      <UserJobsList jobs={jobs || []} />
    </>
  );
}
