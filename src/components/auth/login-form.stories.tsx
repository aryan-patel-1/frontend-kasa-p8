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
          "Formulaire de connexion avec validation native, état de chargement et message d’erreur serveur.",
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

export const FormulaireVide: Story = {};

export const IdentifiantsInvalides: Story = {
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
