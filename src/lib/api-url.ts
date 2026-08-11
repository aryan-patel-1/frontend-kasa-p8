const configuredApiUrl = process.env.API_URL;

if (!configuredApiUrl) {
  throw new Error("La variable d’environnement API_URL est obligatoire");
}

export const API_URL = configuredApiUrl.replace(/\/+$/, "");

// Construit une URL du backend à partir du chemin demandé
export function getApiUrl(path: string) {
  return new URL(path, `${API_URL}/`).toString();
}
