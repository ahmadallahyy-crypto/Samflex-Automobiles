import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout/success", "/cart", "/checkout"] },
    sitemap: "https://samflexautomobiles.com/sitemap.xml",
  };
}
