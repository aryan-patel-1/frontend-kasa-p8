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
          "Carte utilisée dans les listes de logements. Les contrôles permettent de modifier le logement et son état favori.",
      },
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

export const Disponible: Story = {};

export const DansLesFavoris: Story = {
  args: {
    isFavorite: true,
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
};

export const AjoutAuxFavoris: Story = {
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
