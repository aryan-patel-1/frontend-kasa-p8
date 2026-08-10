import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { MessageConversation } from "@/components/messages/message-conversation";
import type { Conversation } from "@/types/message";

const originalFetch = globalThis.fetch;

const conversation: Conversation = {
  id: "conversation-test",
  participantName: "Nathalie Jean",
  participantPicture: null,
  preview: "Bonjour",
  updatedAt: "11:04",
  isUnread: false,
  messages: [
    {
      id: "message-1",
      authorName: "Nathalie Jean",
      content: "Bonjour",
      sentAt: "11:04",
      isCurrentUser: false,
    },
  ],
};

afterEach(() => {
  cleanup();
  globalThis.fetch = originalFetch;
});

test("envoie et affiche un nouveau message", async () => {
  let requestedUrl = "";
  let requestBody = "";
  const updatedConversation: Conversation = {
    ...conversation,
    preview: "Le logement est-il disponible ?",
    messages: [
      ...conversation.messages,
      {
        id: "message-2",
        authorName: "Vous",
        content: "Le logement est-il disponible ?",
        sentAt: "12:30",
        isCurrentUser: true,
      },
    ],
  };

  globalThis.fetch = async (url, options) => {
    requestedUrl = String(url);
    requestBody = String(options?.body);
    return Response.json(updatedConversation, { status: 201 });
  };

  render(<MessageConversation conversation={conversation} />);

  fireEvent.change(screen.getByLabelText("Votre message"), {
    target: { value: "Le logement est-il disponible ?" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Envoyer le message" }));

  await waitFor(() => {
    expect(
      screen.getByText("Le logement est-il disponible ?"),
    ).toBeTruthy();
  });

  expect(requestedUrl).toBe(
    "/api/conversations/conversation-test/messages",
  );
  expect(JSON.parse(requestBody)).toEqual({
    content: "Le logement est-il disponible ?",
  });
  expect(screen.getByLabelText("Votre message").getAttribute("value")).toBe(
    "",
  );
});
