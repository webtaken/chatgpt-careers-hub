import { apiCategoriesList, apiJobsListList } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default async function sitemap() {
  let baseURL = process.env.AUTH_URL || "https://www.chatgpt-jobs.com";

  const getCategories = async () => {
    try {
      setBasePathToAPI();
      const categories = await apiCategoriesList();
      return categories;
    } catch (error) {
      return undefined;
    }
  };

  const getJobs = async () => {
    try {
      setBasePathToAPI();
      // Pull first 5 pages of jobs for sitemap freshness; adjust as needed
      const pageSize = 50;
      const pagesToFetch = 5;
      let jobUrls: MetadataRoute.Sitemap = [];
      for (let page = 1; page <= pagesToFetch; page++) {
        const jobsResponse = await apiJobsListList({ page, pageSize });
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

  const [categories, jobUrls] = await Promise.all([getCategories(), getJobs()]);

  let categoriesSitemap: MetadataRoute.Sitemap = [];
  if (categories) {
    categoriesSitemap = categories.map((category) => {
      return {
        url: `${baseURL}/category/${category.slug}`,
        lastModified: new Date(),
      };
    });
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseURL}/`, lastModified: new Date() },
    { url: `${baseURL}/news`, lastModified: new Date() },
  ];

  return [...staticPages, ...categoriesSitemap, ...(jobUrls || [])];
}
