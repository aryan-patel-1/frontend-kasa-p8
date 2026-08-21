import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { LoginForm } from "@/components/auth/login-form";

const originalFetch = globalThis.fetch;
const rejectLogin = fn(async () =>
  Response.json(
    { error: "Adresse email ou mot de passe incorrect" },
    { status: 401 },
  ),
);

const meta = {
  title: "Kasa/Authentification/Connexion",
  component: LoginForm,
  decorators: [
    (Story) => (
      <div className="flex min-h-[760px] items-center justify-center bg-light-orange p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "`LoginForm` permet à une personne déjà inscrite d’ouvrir une session.\n\n" +
          "- demande une adresse email et un mot de passe avec la validation HTML native\n" +
          "- envoie les valeurs à `POST /api/auth/login` sans exposer directement le backend\n" +
          "- désactive les champs pendant la requête et remplace le libellé du bouton par « Connexion… »\n" +
          "- affiche les erreurs de l’API dans une zone `role=\"alert\"`\n" +
          "- recharge l’accueil après le succès afin que le cookie de session soit pris en compte\n\n" +
          "Le composant ne reçoit aucune prop. La story remplace `fetch` pour documenter les erreurs sans appeler un vrai serveur.",
      },
    },
  },
  beforeEach: () => {
    rejectLogin.mockClear();
    globalThis.fetch = rejectLogin;

    return () => {
      globalThis.fetch = originalFetch;
    };
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormulaireVide: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "État initial du formulaire. Il permet de contrôler les libellés, les champs obligatoires, le lien d’inscription et le comportement responsive.",
      },
    },
  },
};

export const IdentifiantsInvalides: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scénario interactif : la story remplit le formulaire, simule une réponse HTTP 401 et vérifie que le message serveur est annoncé dans la zone d’alerte.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText("Adresse email"),
      "test@test.com",
    );
    await userEvent.type(canvas.getByLabelText("Mot de passe"), "incorrect");
    await userEvent.click(
      canvas.getByRole("button", { name: "Se connecter" }),
    );

    await expect(
      canvas.findByRole("alert"),
    ).resolves.toHaveTextContent("Adresse email ou mot de passe incorrect");
    await expect(rejectLogin).toHaveBeenCalledOnce();
  },
};
