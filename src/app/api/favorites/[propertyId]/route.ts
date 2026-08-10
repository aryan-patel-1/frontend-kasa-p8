import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = "http://localhost:3000";

type FavoriteRouteContext = {
  params: Promise<{ propertyId: string }>;
};

// Transmet la modification au backend sans exposer le jeton au navigateur
async function updateFavorite(
  method: "POST" | "DELETE",
  context: FavoriteRouteContext,
) {
  const token = (await cookies()).get("kasa-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Vous devez être connecté" },
      { status: 401 },
    );
  }

  const { propertyId } = await context.params;
  const response = await fetch(
    `${API_URL}/api/properties/${encodeURIComponent(propertyId)}/favorite`,
    {
      method,
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const message =
      response.status === 401
        ? "Votre session a expiré"
        : "Impossible de modifier ce favori";

    return NextResponse.json({ error: message }, { status: response.status });
  }

  return NextResponse.json({ ok: true });
}

export async function POST(
  _request: Request,
  context: FavoriteRouteContext,
) {
  return updateFavorite("POST", context);
}

export async function DELETE(
  _request: Request,
  context: FavoriteRouteContext,
) {
  return updateFavorite("DELETE", context);
}
