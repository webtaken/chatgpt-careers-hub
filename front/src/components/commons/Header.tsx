import Image from "next/image";
import LinkedinLogo from "../../../public/brands/linkedin-logo.png";
import ZipRecruiterLogo from "../../../public/brands/ziprecruiter-logo.png";
import IndeedLogo from "../../../public/brands/indeed-logo.png";
import { CategoriesListResponse, JobsListListResponse } from "@/client";
import { SubscriptionForm } from "./SubscriptionForm";
import JobsList from "../jobs/JobsList";
import { Button } from "../ui/button";
import Link from "next/link";
import { JobsFilterForm } from "../jobs/JobsFilterForm";
import { Suspense } from "react";
import { SubscriptionsCount } from "./SubscriptionsCount";
import { TopTags, TopTagsSkeleton } from "./TopTags";

export default function Header({
  title,
  categories,
  jobs,
  page,
  pageSize,
}: {
  title?: string;
  categories?: CategoriesListResponse;
  jobs?: JobsListListResponse;
  page: number;
  pageSize: number;
}) {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mt-10">
        {title ?? "FIND THE BEST ChatGPT JOBS"}
      </h1>
      <p className="text-center text-sm font-medium">
        Take advantage of the AI Hype and search the best ChatGPT related jobs.
      </p>
      <div className="flex items-center justify-center my-4 gap-x-4">
        <p className="text-sm">As seen in:</p>
        <div className="flex items-center gap-x-3">
          <Image
            src={LinkedinLogo}
            width={100}
            height={100}
            className="w-10 h-10"
            alt="Linkedin"
          />
          <Image
            src={ZipRecruiterLogo}
            width={100}
            height={100}
            className="w-40 h-20"
            alt="Zip Recruiter"
          />
          <Image
            src={IndeedLogo}
            width={100}
            height={100}
            className="w-40 h-10"
            alt="Indeed"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-center text-sm text-foreground">
          Find us on our social media 👉
        </p>
        <Button variant="link" asChild className="px-1">
          <Link
            href="https://www.linkedin.com/company/chatgpt-jobs-all"
            target="_blank"
          >
            Linkedin
          </Link>
        </Button>
      </div>

      <div className="my-4">
        <SubscriptionForm />
        <Suspense fallback={null}>
          <SubscriptionsCount />
        </Suspense>
      </div>

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

      {jobs && <JobsList jobs={jobs} page={page} pageSize={pageSize} />}
    </>
  );
}
