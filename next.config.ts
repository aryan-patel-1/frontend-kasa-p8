import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// Fixe la racine pour empêcher Turbopack de choisir un dossier parent
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
