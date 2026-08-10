import { cookies } from "next/headers";
import {
  mapApiProperty,
  type ApiProperty,
} from "@/services/properties";
import type { Property } from "@/types/property";

type TokenPayload = {
  id?: unknown;
};

const API_URL = "http://localhost:3000";

// Lit uniquement l'identifiant nécessaire pour construire la route backend
function getUserId(token: string) {
  const encodedPayload = token.split(".")[1];

  if (!encodedPayload) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as TokenPayload;

    return typeof payload.id === "number" ? payload.id : null;
  } catch {
    return null;
  }
}

// Récupère les favoris du compte identifié par le cookie de connexion
export async function getApiFavoriteProperties(): Promise<Property[]> {
  const token = (await cookies()).get("kasa-token")?.value;

  if (!token) {
    return [];
  }

  const userId = getUserId(token);

  if (!userId) {
    return [];
  }

  // Le backend vérifie le jeton et interdit l'accès aux autres comptes
  const response = await fetch(`${API_URL}/api/users/${userId}/favorites`, {
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
