import type { MetadataRoute } from "next";
import { apiNewsletterPostsList } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.AUTH_URL || "https://www.chatgpt-jobs.com";

  const getPromotionPosts = async () => {
    try {
      setBasePathToAPI();
      const pageSize = 50;
      const pagesToFetch = 10;
      let promoUrls: MetadataRoute.Sitemap = [];

      for (let page = 1; page <= pagesToFetch; page++) {
        const response = await apiNewsletterPostsList({
          page,
          pageSize,
          type: "promo",
        });
        const items = response?.results || [];

        promoUrls.push(
          ...items.map((post) => ({
            url: `${baseURL}/promotions/${post.slug}`,
            lastModified: post.published_at
              ? new Date(post.published_at)
              : new Date(),
          }))
        );

        if (!response?.next) break;
      }
      return promoUrls;
    } catch (error) {
      console.error("Error fetching promotion posts for sitemap:", error);
      return [] as MetadataRoute.Sitemap;
    }
  };

  const promoUrls = await getPromotionPosts();

  return [
    {
      url: `${baseURL}/promotions`,
      lastModified: new Date(),
    },
    ...(promoUrls || []),
  ];
}
