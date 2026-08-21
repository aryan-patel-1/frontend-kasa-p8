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
          "`MessageConversation` affiche le fil d’une discussion et son formulaire de réponse.\n\n" +
          "- distingue les messages du compte connecté par l’alignement et le style de la bulle\n" +
          "- conserve le nom de l’auteur et l’heure pour chaque message\n" +
          "- désactive la saisie quand aucune discussion n’est sélectionnée\n" +
          "- refuse les messages vides après suppression des espaces et limite la saisie à 2 000 caractères\n" +
          "- envoie le contenu à la route API de la conversation, affiche les erreurs et rafraîchit les données serveur après un succès\n" +
          "- annonce les nouveaux messages grâce à la zone `aria-live=\"polite\"`\n\n" +
          "La prop `conversation` accepte aussi `null` pour représenter l’état d’attente du panneau desktop.",
      },
    },
  },
  argTypes: {
    conversation: {
      description:
        "Discussion à afficher avec son participant et ses messages, ou `null` lorsqu’aucune discussion n’est sélectionnée.",
      control: "object",
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

export const Discussion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Conversation existante avec des messages entrants et sortants. Le formulaire est disponible pour écrire une réponse.",
      },
    },
  },
};

export const SansSelection: Story = {
  args: {
    conversation: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          "État du panneau avant la sélection d’une discussion. Un message guide l’utilisateur et la saisie reste désactivée.",
      },
    },
  },
};

export const EnvoiReussi: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Scénario interactif qui écrit puis envoie une réponse simulée. Il vérifie l’ajout du message, la remise à zéro du champ et l’appel à l’API.",
      },
    },
  },
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
