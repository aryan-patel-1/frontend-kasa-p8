import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { SiteHeader } from "@/components/layout/site-header";

const meta = {
  title: "Kasa/Layout/En-tête",
  component: SiteHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Navigation principale de Kasa. Elle affiche les liens du site sur ordinateur et le bouton du menu sur mobile.",
      },
    },
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationPrincipale: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "À propos" }),
    ).toHaveAttribute("href", "/about");
  },
};
