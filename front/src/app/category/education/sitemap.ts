import type { MetadataRoute } from "next";
import { jobsListList } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.AUTH_URL || "https://www.chatgpt-jobs.com";

  const getJobs = async () => {
    try {
      setBasePathToAPI();
      const pageSize = 50;
      const pagesToFetch = 5;
      let jobUrls: MetadataRoute.Sitemap = [];
      for (let page = 1; page <= pagesToFetch; page++) {
        const jobsResponse = await jobsListList({
          page,
          pageSize,
          categoryText: "education",
        });
        const items = jobsResponse?.results || [];
        jobUrls.push(
          ...items.map((job) => ({
            url: `${baseURL}/job/${job.slug}`,
            lastModified: new Date(),
          }))
        );
        if (!jobsResponse?.next) break;
      }
      return jobUrls;
    } catch (error) {
      return [] as MetadataRoute.Sitemap;
    }
  };

  const jobUrls = await getJobs();

  return [
    { url: `${baseURL}/category/education`, lastModified: new Date() },
    ...(jobUrls || []),
  ];
}
