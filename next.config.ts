import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";


const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const apiUrl = new URL("http://localhost:3000");

const nextConfig: NextConfig = {
  // Autorise uniquement les sources d'images utilisées par les logements
  images: {
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
