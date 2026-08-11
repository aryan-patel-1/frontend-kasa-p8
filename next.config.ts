import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const configuredApiUrl = process.env.API_URL;

if (!configuredApiUrl) {
  throw new Error("La variable d’environnement API_URL est obligatoire");
}

const apiUrl = new URL(configuredApiUrl);

const nextConfig: NextConfig = {
  // Autorise uniquement les sources d'images utilisées par les logements
  images: {
    // Autorise l'adresse locale uniquement pendant le développement
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      new URL(
        "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/**",
      ),
      new URL("/**", apiUrl),
    ],
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
