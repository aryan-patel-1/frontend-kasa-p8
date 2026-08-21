import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { PropertyCard } from "@/components/property/property-card";
import { mockProperties } from "@/mocks/properties";

const property = mockProperties[0];
const originalFetch = globalThis.fetch;
const updateFavorite = fn(async () => new Response(null, { status: 200 }));

const meta = {
  title: "Kasa/Logements/Carte logement",
  component: PropertyCard,
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-start justify-center bg-light-orange p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "`PropertyCard` présente un logement dans les grilles de l’accueil et des favoris.\n\n" +
          "- affiche la couverture, le titre, la localisation et le prix par nuit\n" +
          "- transforme la zone de contenu en lien vers la fiche détaillée\n" +
          "- garde le bouton favori en dehors du lien pour éviter d’imbriquer deux contrôles interactifs\n" +
          "- remplace une couverture absente par un état « Image indisponible »\n" +
          "- adapte la requête d’image à la largeur du viewport grâce à `next/image`\n\n" +
          "Utilisez les contrôles pour tester une autre propriété, les droits de modification et le rafraîchissement après une action favorite.",
      },
    },
  },
  argTypes: {
    property: {
      description:
        "Toutes les données publiques du logement affiché : identifiant, titre, couverture, lieu, prix et informations complémentaires.",
      control: "object",
    },
    isFavorite: {
      description: "Détermine l’état initial du bouton favori.",
      control: "boolean",
    },
    canUpdateFavorite: {
      description:
        "Autorise l’ajout ou le retrait du favori. Le bouton reste visible mais désactivé lorsque la valeur est `false`.",
      control: "boolean",
    },
    refreshAfterFavoriteUpdate: {
      description:
        "Rafraîchit les composants serveur après la requête, notamment pour retirer une carte de la page Favoris.",
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
    property,
    isFavorite: false,
    canUpdateFavorite: true,
    refreshAfterFavoriteUpdate: false,
  },
} satisfies Meta<typeof PropertyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Disponible: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Carte standard d’un logement disponible. Le favori est modifiable et commence dans l’état inactif.",
      },
    },
  },
};

export const DansLesFavoris: Story = {
  args: {
    isFavorite: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Variante avec le favori déjà actif. L’icône et `aria-pressed` indiquent cet état sans dépendre uniquement de la couleur.",
      },
    },
  },
};

export const SansImage: Story = {
  args: {
    property: {
      ...property,
      cover: null,
      pictures: [],
    },
    canUpdateFavorite: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "État de repli utilisé quand l’API ne fournit ni couverture ni galerie. Le bouton favori est désactivé dans cet exemple.",
      },
    },
  },
};

export const AjoutAuxFavoris: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scénario interactif qui ajoute le logement aux favoris, puis vérifie l’état accessible du bouton et la requête `POST` envoyée.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: `Ajouter ${property.title} aux favoris`,
    });

    await userEvent.click(button);

    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(updateFavorite).toHaveBeenCalledWith(
      `/api/favorites/${property.id}`,
      { method: "POST" },
    );
  },
};
