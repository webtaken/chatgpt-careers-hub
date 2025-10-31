import type { MetadataRoute } from "next";
import { apiNewsletterPostsList } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.AUTH_URL || "https://www.chatgpt-jobs.com";

  const getTrainingPosts = async () => {
    try {
      setBasePathToAPI();
      const pageSize = 50;
      const pagesToFetch = 10;
      let trainingUrls: MetadataRoute.Sitemap = [];

      for (let page = 1; page <= pagesToFetch; page++) {
        const response = await apiNewsletterPostsList({
          page,
          pageSize,
          type: "training",
        });
        const items = response?.results || [];

        trainingUrls.push(
          ...items.map((post) => ({
            url: `${baseURL}/trainings/${post.slug}`,
            lastModified: post.published_at
              ? new Date(post.published_at)
              : new Date(),
          }))
        );

        if (!response?.next) break;
      }
      return trainingUrls;
    } catch (error) {
      console.error("Error fetching training posts for sitemap:", error);
      return [] as MetadataRoute.Sitemap;
    }
  };

  const trainingUrls = await getTrainingPosts();

  return [
    {
      url: `${baseURL}/trainings`,
      lastModified: new Date(),
    },
    ...(trainingUrls || []),
  ];
}
