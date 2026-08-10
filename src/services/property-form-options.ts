import type { PropertyFormOptions } from "@/types/property-form-options";

// Réserve ce service si le backend expose ces options plus tard
export async function getApiPropertyFormOptions(): Promise<PropertyFormOptions> {
  throw new Error(
    "La récupération API des options de logement reste à implémenter",
  );
}
