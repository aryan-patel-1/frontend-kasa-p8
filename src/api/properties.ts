import type { Property } from "@/types/property";

// Représente exactement les champs renvoyés par le backend
type ApiProperty = {
  id: string;
  slug?: string;
  title: string;
  cover?: string | null;
  pictures?: string[];
  description?: string | null;
  host?: {
    id?: number;
    name?: string | null;
    picture?: string | null;
  };
  rating_avg?: number | null;
  ratings_count?: number | null;
  location?: string | null;
  equipments?: string[];
  tags?: string[];
  price_per_night?: number | null;
};

// Le frontend et le backend utilisent deux ports différents en local
const API_URL = "http://localhost:3000";

// Construit une adresse complète à partir du chemin de la route API
function getApiUrl(path: string) {
  return new URL(path, API_URL).toString();
}

// Transforme les chemins relatifs du backend en URL complète
function getImageUrl(image: string | null | undefined) {
  if (!image) {
    return null;
  }

  if (image.startsWith("/")) {
    return new URL(image, API_URL).toString();
  }

  return image;
}

// Adapte les noms snake case du backend aux noms camelCase du frontend
function mapApiProperty(apiProperty: ApiProperty): Property {
  // Conserve null pour ne jamais remplacer une image du backend
  const cover = getImageUrl(apiProperty.cover);

  return {
    id: apiProperty.id,
    slug: apiProperty.slug ?? apiProperty.id,
    title: apiProperty.title,
    cover,
    // Évite d'afficher deux fois la couverture dans la galerie
    pictures: (apiProperty.pictures ?? [])
      .map((picture) => getImageUrl(picture))
      .filter(
        (picture): picture is string =>
          picture !== null && picture !== cover,
      ),
    description: apiProperty.description ?? "",
    host: {
      id: apiProperty.host?.id ?? 0,
      name: apiProperty.host?.name ?? "Hôte Kasa",
      // Utilise directement le champ picture renvoyé pour l'hôte
      picture: getImageUrl(apiProperty.host?.picture),
    },
    ratingAverage: apiProperty.rating_avg ?? 0,
    ratingsCount: apiProperty.ratings_count ?? 0,
    location: apiProperty.location ?? "Localisation non renseignée",
    equipments: apiProperty.equipments ?? [],
    tags: apiProperty.tags ?? [],
    pricePerNight: apiProperty.price_per_night ?? 0,
  };
}

// Désactive le cache pour voir immédiatement les changements du backend
async function fetchProperties(path: string) {
  return fetch(getApiUrl(path), { cache: "no-store" });
}

// Récupère la liste utilisée par les cartes de la page d'accueil
export async function getApiProperties(): Promise<Property[]> {
  const response = await fetchProperties("/api/properties");

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer les logements (${response.status})`,
    );
  }

  const properties = (await response.json()) as ApiProperty[];

  return properties.map(mapApiProperty);
}

// Récupère toutes les informations nécessaires à la fiche logement
export async function getApiPropertyById(
  id: string,
): Promise<Property | null> {
  const response = await fetchProperties(
    `/api/properties/${encodeURIComponent(id)}`,
  );

  // Permet à la page détail d'afficher la page 404 de Next
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer le logement ${id} (${response.status})`,
    );
  }

  const property = (await response.json()) as ApiProperty;

  return mapApiProperty(property);
}
