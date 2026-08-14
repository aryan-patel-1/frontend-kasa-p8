import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { AddPropertyForm } from "@/components/property/add-property-form";
import { mockPropertyFormOptions } from "@/mocks/property-form-options";

const meta = {
  title: "Kasa/Logements/Formulaire d’ajout",
  component: AddPropertyForm,
  decorators: [
    (Story) => (
      <div className="mx-auto min-h-screen max-w-[1168px] bg-light-orange px-4 pb-10">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Formulaire complet de création d’un logement avec photos, équipements et catégories personnalisées.",
      },
    },
  },
  args: {
    equipments: mockPropertyFormOptions.equipments,
    categories: mockPropertyFormOptions.categories,
  },
} satisfies Meta<typeof AddPropertyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormulaireVide: Story = {};

export const AjoutCategoriePersonnalisee: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(
      "Ajouter une catégorie personnalisée",
    );

    await userEvent.type(input, "Terrasse");
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Ajouter la catégorie personnalisée",
      }),
    );

    await expect(
      canvas.getByRole("button", { name: "Terrasse" }),
    ).toHaveAttribute("aria-pressed", "true");
  },
};
