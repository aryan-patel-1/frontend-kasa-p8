import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/add-property",
        "/favorites",
        "/login",
        "/messages",
        "/sign-up",
      ],
    },
    sitemap: getSiteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
