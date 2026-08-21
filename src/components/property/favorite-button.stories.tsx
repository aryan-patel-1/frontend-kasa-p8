import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { FavoriteButton } from "@/components/property/favorite-button";

const originalFetch = globalThis.fetch;
const updateFavorite = fn(async () => new Response(null, { status: 200 }));

const meta = {
  title: "Kasa/Logements/Bouton favori",
  component: FavoriteButton,
  decorators: [
    (Story) => (
      <div className="relative h-40 w-72 rounded-[10px] bg-gris-light">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "`FavoriteButton` ajoute ou retire un logement des favoris sans attendre un rechargement complet.\n\n" +
          "- affiche immédiatement le nouvel état pour rendre l’action réactive\n" +
          "- envoie `POST` pour ajouter le logement et `DELETE` pour le retirer\n" +
          "- restaure l’état précédent et annonce une erreur si la requête échoue\n" +
          "- redirige vers la connexion lorsque l’API répond avec le statut 401\n" +
          "- peut rafraîchir les composants serveur afin de retirer une carte de la page Favoris\n" +
          "- expose `aria-pressed`, `aria-busy` et un libellé contenant le titre du logement\n\n" +
          "Le bouton utilise un positionnement absolu : son parent doit donc fournir un contexte positionné, comme le fait `PropertyCard`.",
      },
    },
  },
  argTypes: {
    propertyId: {
      description:
        "Identifiant utilisé dans l’URL de la requête vers l’API des favoris.",
      control: "text",
    },
    propertyTitle: {
      description:
        "Titre intégré au nom accessible du bouton pour préciser quel logement sera modifié.",
      control: "text",
    },
    initialIsFavorite: {
      description: "État favori utilisé lors du premier rendu.",
      control: "boolean",
    },
    enabled: {
      description:
        "Autorise l’interaction. Une valeur `false` conserve le bouton visible mais désactivé.",
      control: "boolean",
    },
    refreshAfterUpdate: {
      description:
        "Demande un `router.refresh()` après une réponse réussie pour actualiser les données serveur.",
      control: "boolean",
    },
  },
  beforeEach: () => {
    updateFavorite.mockClear();
    globalThis.fetch = updateFavorite;

    return () => {
      globalThis.fetch = originalFetch;
    };
  },
  args: {
    propertyId: "appartement-cosy",
    propertyTitle: "Appartement cosy",
    initialIsFavorite: false,
    enabled: true,
    refreshAfterUpdate: false,
  },
} satisfies Meta<typeof FavoriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactif: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "État initial d’un logement qui n’est pas encore enregistré dans les favoris.",
      },
    },
  },
};

export const Actif: Story = {
  args: {
    initialIsFavorite: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "État d’un logement déjà favori. Le bouton rouge possède `aria-pressed=\"true\"` et propose l’action de retrait.",
      },
    },
  },
};

export const Desactive: Story = {
  args: {
    enabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "État non interactif utilisé lorsque la modification des favoris n’est pas autorisée.",
      },
    },
  },
};

export const AjoutReussi: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scénario interactif qui clique sur le bouton puis vérifie la mise à jour accessible et la requête `POST`.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: "Ajouter Appartement cosy aux favoris",
    });

    await userEvent.click(button);

    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(updateFavorite).toHaveBeenCalledWith(
      "/api/favorites/appartement-cosy",
      { method: "POST" },
    );
  },
};
