import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteFooter } from "@/components/layout/site-footer";

const meta = {
  title: "Kasa/Layout/Pied de page",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
    docs: {
      description: {
        component:
          "Pied de page commun avec le logo Kasa, le copyright et l’action de déconnexion.",
      },
    },
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParDefaut: Story = {};
