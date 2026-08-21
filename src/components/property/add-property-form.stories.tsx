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
          "`AddPropertyForm` regroupe toutes les informations nécessaires pour publier un logement.\n\n" +
          "- demande le titre, la description, la localisation, le prix, l’hôte et une couverture\n" +
          "- accepte plusieurs photos du logement ainsi qu’une photo de profil pour l’hôte\n" +
          "- permet de sélectionner plusieurs équipements et catégories avec des boutons `aria-pressed`\n" +
          "- autorise l’ajout d’une catégorie personnalisée sans modifier les options reçues du serveur\n" +
          "- construit un `FormData` pour conserver les fichiers, désactive les champs pendant l’envoi et redirige vers le logement créé\n" +
          "- affiche les erreurs de publication dans une zone `role=\"alert\"`\n\n" +
          "Les props fournissent les choix disponibles ; l’état des sélections et des fichiers reste interne au formulaire.",
      },
    },
  },
  argTypes: {
    equipments: {
      description:
        "Liste des équipements proposés par l’API, par exemple Wi-Fi, lave-linge ou climatisation.",
      control: "object",
    },
    categories: {
      description:
        "Liste initiale des catégories proposées. L’utilisateur peut compléter cette liste dans le formulaire.",
      control: "object",
    },
  },
  args: {
    equipments: mockPropertyFormOptions.equipments,
    categories: mockPropertyFormOptions.categories,
  },
} satisfies Meta<typeof AddPropertyForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormulaireVide: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Formulaire dans son état initial avec les équipements et catégories issus des données de démonstration.",
      },
    },
  },
};

export const AjoutCategoriePersonnalisee: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scénario interactif qui ajoute « Terrasse » puis vérifie que la nouvelle catégorie est immédiatement sélectionnée avec `aria-pressed`.",
      },
    },
  },
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
