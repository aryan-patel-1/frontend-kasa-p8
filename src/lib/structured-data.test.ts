import { describe, expect, it } from "vitest";
import {
  getPropertyStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";
import type { Property } from "@/types/property";

const property: Property = {
  id: "logement-test",
  slug: "logement-test",
  title: "Logement <test>",
  cover: "/img/logement.webp",
  pictures: [],
  description: "Un logement de test",
  host: {
    id: 1,
    name: "Hôte Kasa",
    picture: null,
  },
  ratingAverage: 4.5,
  ratingsCount: 12,
  location: "Paris",
  equipments: ["Wi-Fi"],
  tags: ["Appartement"],
  pricePerNight: 120,
};

describe("données structurées des logements", () => {
  it("décrit le logement comme un produit avec son prix et sa note", () => {
    const data = getPropertyStructuredData(property);
    const product = data["@graph"][1];

    expect(product).toMatchObject({
      "@type": "Product",
      name: property.title,
      offers: {
        "@type": "Offer",
        price: 120,
        priceCurrency: "EUR",
      },
      aggregateRating: {
        ratingValue: 4.5,
        ratingCount: 12,
      },
    });
  });

  it("neutralise les chevrons avant l’insertion dans le HTML", () => {
    const serializedData = serializeStructuredData(
      getPropertyStructuredData(property),
    );

    expect(serializedData).not.toContain("<test>");
    expect(serializedData).toContain("\\u003ctest>");
  });
});
