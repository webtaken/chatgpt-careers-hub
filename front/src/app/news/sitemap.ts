import type { MetadataRoute } from "next";
import { apiNewsletterPostsList } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.AUTH_URL || "https://www.chatgpt-jobs.com";

  const getNewsPosts = async () => {
    try {
      setBasePathToAPI();
      const pageSize = 50;
      const pagesToFetch = 10; // Fetch more pages for news posts
      let newsUrls: MetadataRoute.Sitemap = [];

      for (let page = 1; page <= pagesToFetch; page++) {
        const newsResponse = await apiNewsletterPostsList({
          page,
          pageSize,
        });
        const items = newsResponse?.results || [];

        newsUrls.push(
          ...items.map((post) => ({
            url: `${baseURL}/news/${post.slug}`,
            lastModified: post.published_at
              ? new Date(post.published_at)
              : new Date(),
          }))
        );

        if (!newsResponse?.next) break;
      }
      return newsUrls;
    } catch (error) {
      console.error("Error fetching news posts for sitemap:", error);
      return [] as MetadataRoute.Sitemap;
    }
  };

  const newsUrls = await getNewsPosts();

  return [
    {
      url: `${baseURL}/news`,
      lastModified: new Date(),
    },
    ...(newsUrls || []),
  ];
}
