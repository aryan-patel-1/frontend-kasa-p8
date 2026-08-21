import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConversationList } from "@/components/messages/conversation-list";
import { mockConversations } from "@/mocks/conversations";
import type { Conversation } from "@/types/message";

const conversations: Conversation[] = [
  ...mockConversations,
  {
    id: "marc-bernard",
    participantId: 2,
    participantName: "Marc Bernard",
    participantPicture: null,
    preview: "Merci pour votre réponse, à bientôt.",
    updatedAt: "Hier",
    isUnread: false,
    messages: [],
  },
];

const meta = {
  title: "Kasa/Messagerie/Liste des conversations",
  component: ConversationList,
  decorators: [
    (Story) => (
      <div className="mx-auto min-h-[700px] max-w-[470px] bg-blanc p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "`ConversationList` affiche les discussions disponibles et permet d’ouvrir celle qui intéresse l’utilisateur.\n\n" +
          "- présente le participant, l’aperçu du dernier message et l’heure de mise à jour\n" +
          "- signale une conversation non lue avec un texte caché accessible, en plus de l’indicateur visuel\n" +
          "- met en évidence la conversation active avec `aria-current`\n" +
          "- propose un mode normal pour la page mobile et un mode compact pour le panneau desktop\n" +
          "- affiche un message explicite lorsque la liste est vide\n\n" +
          "Chaque ligne est un lien vers `/messages/[conversationId]`. Les données sont reçues déjà prêtes à afficher.",
      },
    },
  },
  argTypes: {
    conversations: {
      description:
        "Conversations à afficher, avec le participant, l’aperçu, la date, l’état de lecture et les messages.",
      control: "object",
    },
    activeConversationId: {
      description:
        "Identifiant de la discussion actuellement ouverte. Il sert à appliquer l’état actif et `aria-current`.",
      control: "text",
    },
    compact: {
      description:
        "Adapte les dimensions et les bordures au panneau latéral de la mise en page desktop.",
      control: "boolean",
    },
  },
  args: {
    conversations,
    activeConversationId: conversations[0].id,
    compact: false,
  },
} satisfies Meta<typeof ConversationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListeMobile: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Version pleine largeur destinée à l’écran mobile de messagerie. La première conversation est sélectionnée.",
      },
    },
  },
};

export const PanneauDesktop: Story = {
  args: {
    compact: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Version compacte utilisée comme panneau gauche lorsque la liste et la discussion sont visibles côte à côte.",
      },
    },
  },
};

export const ListeVide: Story = {
  args: {
    conversations: [],
    activeConversationId: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "État vide affiché quand le compte ne possède encore aucune conversation.",
      },
    },
  },
};
