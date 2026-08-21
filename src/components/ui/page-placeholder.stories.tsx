import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PagePlaceholder } from "@/components/ui/page-placeholder";

const meta = {
  title: "Kasa/Interface/Page temporaire",
  component: PagePlaceholder,
  decorators: [
    (Story) => (
      <main className="flex min-h-[420px] bg-light-orange">
        <Story />
      </main>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "`PagePlaceholder` conserve une présentation cohérente lorsqu’un écran n’a pas encore son contenu définitif.\n\n" +
          "- affiche toujours un titre principal\n" +
          "- accepte un court surtitre et une description facultatifs\n" +
          "- centre le contenu et limite la largeur du texte pour faciliter la lecture\n" +
          "- utilise une section sémantique structurée par un `h1`\n" +
          "- s’adapte aux petits écrans avec des espacements et tailles de texte responsives\n\n" +
          "Ce composant convient uniquement aux écrans transitoires ; il doit être remplacé lorsque la fonctionnalité finale est disponible.",
      },
    },
  },
  argTypes: {
    title: {
      description:
        "Titre principal obligatoire qui décrit clairement la page attendue.",
      control: "text",
    },
    eyebrow: {
      description:
        "Surtitre facultatif affiché au-dessus du titre pour préciser la rubrique.",
      control: "text",
    },
    description: {
      description:
        "Texte facultatif qui explique l’état de la page ou guide la prochaine action.",
      control: "text",
    },
  },
  args: {
    title: "Bientôt disponible",
    eyebrow: "Nouveauté Kasa",
    description:
      "Cette fonctionnalité est en cours de préparation. Revenez prochainement pour la découvrir.",
  },
} satisfies Meta<typeof PagePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Complet: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Version complète avec les trois niveaux d’information : rubrique, titre et explication.",
      },
    },
  },
};

export const TitreSeul: Story = {
  args: {
    eyebrow: undefined,
    description: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Version minimale quand un titre suffit. Aucun espace vide n’est conservé pour les contenus facultatifs.",
      },
    },
  },
};
