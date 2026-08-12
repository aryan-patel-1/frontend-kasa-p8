import { cookies } from "next/headers";
import { getApiUrl } from "@/lib/api-url";
import { getTokenUserId } from "@/lib/auth-token";
import {
  mapApiProperty,
  type ApiProperty,
} from "@/services/properties";
import type { Property } from "@/types/property";

// Récupère les favoris du compte identifié par le cookie de connexion
export async function getApiFavoriteProperties(): Promise<Property[]> {
  const token = (await cookies()).get("kasa-token")?.value;

  if (!token) {
    return [];
  }

  const userId = getTokenUserId(token);

  if (!userId) {
    return [];
  }

  // Le backend vérifie le jeton et interdit l'accès aux autres comptes
  const response = await fetch(getApiUrl(`/api/users/${userId}/favorites`), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  // Un cookie expiré ne doit pas empêcher les logements de s'afficher
  if (response.status === 401 || response.status === 403) {
    return [];
  }

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer les favoris (${response.status})`,
    );
  }

  const favoriteProperties = (await response.json()) as ApiProperty[];

  return favoriteProperties.map(mapApiProperty);
}
