function addProtocol(url: string) {
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}

const configuredSiteUrl = process.env.SITE_URL;
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
  configuredSiteUrl ?? vercelProductionUrl ?? "http://localhost:3001";

// Vercel fournit son domaine sans protocole
export const SITE_URL = new URL(addProtocol(siteUrl));

export function getSiteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
