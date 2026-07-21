import type { Property } from "@/types/property";

// Réserve les appels réseau pour remplacer les logements simulés
export async function getApiProperties(): Promise<Property[]> {
  throw new Error("La récupération API des logements reste à implémenter");
}

export async function getApiPropertyById(
  id: string,
): Promise<Property | null> {
  throw new Error(
    `La récupération API du logement ${id} reste à implémenter`,
  );
}
