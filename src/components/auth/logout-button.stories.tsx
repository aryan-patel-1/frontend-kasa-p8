import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogoutButton } from "@/components/auth/logout-button";

const meta = {
  title: "Kasa/Authentification/Déconnexion",
  component: LogoutButton,
  decorators: [
    (Story) => (
      <div className="flex min-h-40 items-center justify-center bg-blanc p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
    docs: {
      description: {
        component:
          "`LogoutButton` ferme la session active depuis le pied de page.\n\n" +
          "- supprime l’ancien token éventuellement présent dans le stockage local\n" +
          "- appelle `DELETE /api/auth/logout` pour supprimer le cookie HTTP-only côté serveur\n" +
          "- redirige toujours vers la connexion et rafraîchit le routeur, même si la requête échoue\n" +
          "- ne produit aucun HTML en mode mock ou sur la page `/login`\n" +
          "- conserve un focus clavier visible et un libellé d’action explicite\n\n" +
          "Le composant ne reçoit aucune prop : il lit directement le chemin courant et la configuration de l’application.",
      },
    },
  },
} satisfies Meta<typeof LogoutButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SurUnePageConnectee: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Bouton visible sur une page connectée lorsque Kasa utilise le backend. Le clic est volontairement laissé manuel dans cette story car il déclenche une navigation.",
      },
    },
  },
};
