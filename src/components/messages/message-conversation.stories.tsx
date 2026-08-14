import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { MessageConversation } from "@/components/messages/message-conversation";
import { mockConversations } from "@/mocks/conversations";
import type { Conversation } from "@/types/message";

const conversation = mockConversations[0];
const sentContent = "Merci, je confirme mon intérêt pour ce logement.";
const updatedConversation: Conversation = {
  ...conversation,
  preview: sentContent,
  updatedAt: "12:30",
  messages: [
    ...conversation.messages,
    {
      id: "message-storybook",
      authorName: "Vous",
      content: sentContent,
      sentAt: "12:30",
      isCurrentUser: true,
    },
  ],
};
const originalFetch = globalThis.fetch;
const sendMessage = fn(async () =>
  Response.json(updatedConversation, { status: 201 }),
);

const meta = {
  title: "Kasa/Messagerie/Conversation",
  component: MessageConversation,
  decorators: [
    (Story) => (
      <div className="mx-auto h-[700px] max-w-[860px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Fil de messages avec distinction entre le compte connecté et l’hôte, puis formulaire d’envoi.",
      },
    },
  },
  beforeEach: () => {
    sendMessage.mockClear();
    globalThis.fetch = sendMessage;

    return () => {
      globalThis.fetch = originalFetch;
    };
  },
  args: {
    conversation,
  },
} satisfies Meta<typeof MessageConversation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Discussion: Story = {};

export const SansSelection: Story = {
  args: {
    conversation: null,
  },
};

export const EnvoiReussi: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Votre message");

    await userEvent.type(input, sentContent);
    await userEvent.click(
      canvas.getByRole("button", { name: "Envoyer le message" }),
    );

    await expect(canvas.findByText(sentContent)).resolves.toBeInTheDocument();
    await expect(input).toHaveValue("");
    await expect(sendMessage).toHaveBeenCalledOnce();
  },
};
