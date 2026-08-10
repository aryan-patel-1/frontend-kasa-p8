import path from "node:path";

const w3cCompatibilityPlugin = path.join(
  process.cwd(),
  "postcss-w3c-compatibility.cjs",
);

// Active Tailwind pendant la transformation des feuilles de style
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    [w3cCompatibilityPlugin]: {},
  },
};

export default config;
