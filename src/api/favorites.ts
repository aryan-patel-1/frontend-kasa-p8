import type { Property } from "@/types/property";

// Réserve l'appel réseau pour les favoris du compte connecté
export async function getApiFavoriteProperties(): Promise<Property[]> {
  throw new Error("La récupération API des favoris reste à implémenter");
}
