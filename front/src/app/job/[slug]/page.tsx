import { getJobBySlug } from "@/lib/job-actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { auth } from "@/auth";
import React from "react";
import { JobDetailView } from "@/components/jobs/JobDetailView";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const job = await getJobBySlug(params.slug);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  const locationString = job.location
    .map((location) => location.location)
    .join(", ");

  const baseUrl = process.env.AUTH_URL || "https://www.chatgpt-jobs.com";

  return {
    title: `${job.title} at ${job.company_name} - ${locationString}`,
    description: `Apply for ${job.title} position at ${
      job.company_name
    }. ${job.description.replace(/<[^>]*>/g, "").substring(0, 160)}...`,
    alternates: {
      canonical: `${baseUrl}/job/${params.slug}`,
    },
    openGraph: {
      title: `${job.title} at ${job.company_name}`,
      description: `Apply for ${job.title} position at ${
        job.company_name
      }. ${job.description.replace(/<[^>]*>/g, "").substring(0, 160)}...`,
      type: "website",
      url: `${baseUrl}/job/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at ${job.company_name}`,
      description: `Apply for ${job.title} position at ${
        job.company_name
      }. ${job.description.replace(/<[^>]*>/g, "").substring(0, 160)}...`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const [job, session] = await Promise.all([getJobBySlug(params.slug), auth()]);

  if (!job) {
    notFound();
  }

  // Generate structured data for job posting
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description.replace(/<[^>]*>/g, ""),
    hiringOrganization: {
      "@type": "Organization",
      name: job.company_name,
    },
    jobLocation: job.location.map((loc) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: loc.location,
      },
    })),
    datePosted: job.created_at,
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    employmentType: "FULL_TIME",
    applicationContact: {
      "@type": "ContactPoint",
      contactType: "hiring",
      url: job.apply_url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <JobDetailView job={job} session={session} />
    </>
  );
}
