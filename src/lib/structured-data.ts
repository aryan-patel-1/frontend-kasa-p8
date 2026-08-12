import { getSiteUrl } from "@/lib/site-url";
import { ROUTES } from "@/lib/routes";
import type { Property } from "@/types/property";

function getAbsoluteImageUrl(image: string) {
  return image.startsWith("http://") || image.startsWith("https://")
    ? image
    : getSiteUrl(image);
}

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function getWebsiteStructuredData() {
  const homeUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${homeUrl}#organization`,
        name: "Kasa",
        url: homeUrl,
        logo: getSiteUrl("/img/logos/logo-kasa-mark.svg"),
      },
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        name: "Kasa",
        url: homeUrl,
        inLanguage: "fr-FR",
        publisher: {
          "@id": `${homeUrl}#organization`,
        },
      },
    ],
  };
}

export function getPropertyStructuredData(property: Property) {
  const homeUrl = getSiteUrl();
  const propertyUrl = getSiteUrl(ROUTES.property(property.id));
  const images = [property.cover, ...property.pictures]
    .filter((image): image is string => image !== null)
    .map(getAbsoluteImageUrl);
  const aggregateRating =
    property.ratingAverage > 0 && property.ratingsCount > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: property.ratingAverage,
          ratingCount: property.ratingsCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: property.title,
            item: propertyUrl,
          },
        ],
      },
      {
        "@type": "Product",
        "@id": `${propertyUrl}#property`,
        additionalType: "https://schema.org/Accommodation",
        name: property.title,
        description: property.description,
        sku: property.id,
        url: propertyUrl,
        image: images,
        category: property.tags,
        brand: {
          "@type": "Brand",
          name: "Kasa",
        },
        offers: {
          "@type": "Offer",
          url: propertyUrl,
          price: property.pricePerNight,
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: property.pricePerNight,
            priceCurrency: "EUR",
            unitText: "nuit",
          },
          seller: {
            "@id": `${homeUrl}#organization`,
          },
        },
        aggregateRating,
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Localisation",
            value: property.location,
          },
          ...property.equipments.map((equipment) => ({
            "@type": "PropertyValue",
            name: "Équipement",
            value: equipment,
          })),
        ],
      },
    ],
  };
}
