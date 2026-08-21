import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { SiteHeader } from "@/components/layout/site-header";

const meta = {
  title: "Kasa/Layout/En-tête",
  component: SiteHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "`SiteHeader` fournit la navigation principale sur toutes les pages de Kasa.\n\n" +
          "- **Sur ordinateur** : affiche le logo complet, les liens Accueil et À propos, l’ajout d’un logement, les favoris et la messagerie\n" +
          "- **Sur mobile** : remplace les liens par un bouton qui ouvre un menu plein écran\n" +
          "- **Comportement** : l’ouverture du menu est gérée localement avec `useState`\n" +
          "- **Accessibilité** : les deux navigations ont un nom explicite, le bouton expose son état avec `aria-expanded` et toutes les actions restent accessibles au clavier\n\n" +
          "Le composant ne reçoit aucune prop : les destinations viennent de `ROUTES` afin de centraliser les URL de l’application.",
      },
    },
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationPrincipale: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Affichage par défaut. Réduisez la largeur du canvas pour observer le passage de la navigation desktop au bouton du menu mobile.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "À propos" }),
    ).toHaveAttribute("href", "/about");
  },
};
