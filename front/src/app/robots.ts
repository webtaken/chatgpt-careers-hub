import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  let baseURL = "https://chatgpt-jobs.com";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/category"],
      disallow: ["/dashboard/", "/hiring/"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
