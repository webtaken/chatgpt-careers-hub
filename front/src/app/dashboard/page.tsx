import UserJobsList from "@/components/jobs/UserJobsList";
import { getUserJobs } from "@/lib/job-actions";

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
