import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "next/navigation": path.resolve("src/test/next-navigation.ts"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
