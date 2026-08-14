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
          "Liste des discussions avec aperçu, heure, message non lu et conversation active.",
      },
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

export const ListeMobile: Story = {};

export const PanneauDesktop: Story = {
  args: {
    compact: true,
  },
};

export const ListeVide: Story = {
  args: {
    conversations: [],
    activeConversationId: undefined,
  },
};
