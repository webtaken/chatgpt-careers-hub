import { categoriesList } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default async function sitemap() {
  let baseURL = "https://chatgpt-jobs.com";

  const getCategories = async () => {
    try {
      setBasePathToAPI();
      const categories = await categoriesList();
      return categories;
    } catch (error) {
      return undefined;
    }
  };

  const categories = await getCategories();
  let categoriesSitemap: MetadataRoute.Sitemap = [];
  if (categories) {
    categoriesSitemap = categories.map((category) => {
      return {
        url: `${baseURL}/category/${category.slug}`,
        lastModified: new Date(),
      };
    });
  }
  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    ...categoriesSitemap,
  ];
}
