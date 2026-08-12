import type { MetadataRoute } from "next";
import { dataProvider } from "@/data/data-provider";
import { ROUTES } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await dataProvider.getProperties();

  return [
    {
      url: getSiteUrl(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getSiteUrl(ROUTES.about),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...properties.map((property) => ({
      url: getSiteUrl(ROUTES.property(property.id)),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [property.cover, ...property.pictures]
        .filter((image): image is string => image !== null)
        .map((image) =>
          image.startsWith("http://") || image.startsWith("https://")
            ? image
            : getSiteUrl(image),
        ),
    })),
  ];
}
