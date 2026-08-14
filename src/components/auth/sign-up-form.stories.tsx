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
          "Formulaire de création de compte avec les informations personnelles, le mot de passe et l’acceptation des conditions.",
      },
    },
  },
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormulaireVide: Story = {};
