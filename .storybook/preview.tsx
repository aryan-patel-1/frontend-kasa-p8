import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Signale les problèmes dans Storybook sans bloquer les stories existantes
      test: "todo",
    },
    nextjs: {
      // Fournit le faux routeur utilisé par les composants de l’App Router
      appDirectory: true,
    },
    options: {
      storySort: {
        order: ["Kasa", ["Layout", "Logements", "Messagerie", "Authentification"]],
      },
    },
  },
};

export default preview;
