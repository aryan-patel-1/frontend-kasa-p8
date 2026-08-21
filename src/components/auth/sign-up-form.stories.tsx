import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SignUpForm } from "@/components/auth/sign-up-form";

const meta = {
  title: "Kasa/Authentification/Inscription",
  component: SignUpForm,
  decorators: [
    (Story) => (
      <div className="flex min-h-[940px] items-center justify-center bg-light-orange p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "`SignUpForm` rassemble les informations nécessaires à la création d’un compte Kasa.\n\n" +
          "- collecte le nom, le prénom, l’adresse email et un mot de passe d’au moins six caractères\n" +
          "- exige l’acceptation des conditions générales grâce à la validation HTML native\n" +
          "- envoie les données à `POST /api/auth/register`\n" +
          "- désactive les contrôles pendant l’envoi et affiche les erreurs dans une zone `role=\"alert\"`\n" +
          "- redirige vers l’accueil et rafraîchit les composants serveur après une inscription réussie\n\n" +
          "Le composant ne reçoit aucune prop. Les libellés associés aux champs et les attributs `autocomplete` facilitent la saisie au clavier et avec un gestionnaire de mots de passe.",
      },
    },
  },
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormulaireVide: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "État initial du parcours d’inscription, utile pour vérifier l’ordre des champs, les contraintes natives et l’adaptation mobile ou desktop.",
      },
    },
  },
};
