import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteFooter } from "@/components/layout/site-footer";

const meta = {
  title: "Kasa/Layout/Pied de page",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
    docs: {
      description: {
        component:
          "`SiteFooter` termine les pages de Kasa avec les informations et actions communes.\n\n" +
          "- affiche la marque Kasa et le copyright\n" +
          "- intègre `LogoutButton` lorsque l’application utilise le backend et que la page courante n’est pas la connexion\n" +
          "- empile son contenu sur mobile, puis l’aligne horizontalement à partir du breakpoint `sm`\n" +
          "- utilise un élément HTML `footer` pour donner un repère clair aux technologies d’assistance\n\n" +
          "Le composant ne reçoit aucune prop. La visibilité de la déconnexion dépend du contexte de navigation et de `USE_MOCK`.",
      },
    },
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParDefaut: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pied de page complet dans le contexte de la page d’accueil. Le bouton de déconnexion est visible quand le mode backend est actif.",
      },
    },
  },
};
