import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { mockConversations } from "@/mocks/conversations";
import type { Conversation } from "@/types/message";
import type { Host } from "@/types/property";

const DATA_DIRECTORY = path.join(process.cwd(), ".data");
const CONVERSATIONS_FILE = path.join(DATA_DIRECTORY, "conversations.json");

// Évite que deux envois écrivent le fichier en même temps
let pendingUpdate: Promise<void> = Promise.resolve();

function copyInitialConversations() {
  return JSON.parse(JSON.stringify(mockConversations)) as Conversation[];
}

async function writeConversations(conversations: Conversation[]) {
  await mkdir(DATA_DIRECTORY, { recursive: true });
  await writeFile(
    CONVERSATIONS_FILE,
    JSON.stringify(conversations, null, 2),
    "utf8",
  );
}

export async function getStoredConversations(): Promise<Conversation[]> {
  try {
    const fileContent = await readFile(CONVERSATIONS_FILE, "utf8");
    const conversations = JSON.parse(fileContent) as unknown;

    if (!Array.isArray(conversations)) {
      throw new Error("Le fichier des conversations est invalide");
    }

    return conversations as Conversation[];
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code !== "ENOENT") {
      throw error;
    }

    const initialConversations = copyInitialConversations();
    await writeConversations(initialConversations);
    return initialConversations;
  }
}

export async function getStoredConversationById(id: string) {
  const conversations = await getStoredConversations();
  return conversations.find((conversation) => conversation.id === id) ?? null;
}

export async function getOrCreateStoredConversation(
  participant: Host,
): Promise<Conversation> {
  const update = pendingUpdate.then(async () => {
    const conversations = await getStoredConversations();
    const existingIndex = conversations.findIndex(
      (conversation) =>
        conversation.participantId === participant.id ||
        (!conversation.participantId &&
          conversation.participantName === participant.name),
    );

    if (existingIndex >= 0) {
      const existingConversation = conversations[existingIndex];
      const refreshedConversation = {
        ...existingConversation,
        participantId: participant.id,
        participantName: participant.name,
        participantPicture: participant.picture,
      };

      conversations[existingIndex] = refreshedConversation;
      await writeConversations(conversations);
      return refreshedConversation;
    }

    const conversation: Conversation = {
      id: `host-${participant.id || randomUUID()}`,
      participantId: participant.id,
      participantName: participant.name,
      participantPicture: participant.picture,
      preview: "Nouvelle conversation",
      updatedAt: "",
      isUnread: false,
      messages: [],
    };

    await writeConversations([conversation, ...conversations]);
    return conversation;
  });

  pendingUpdate = update.then(
    () => undefined,
    () => undefined,
  );
  return update;
}

export async function addStoredMessage(
  conversationId: string,
  content: string,
): Promise<Conversation | null> {
  let updatedConversation: Conversation | null = null;

  const update = pendingUpdate.then(async () => {
    const conversations = await getStoredConversations();
    const conversation = conversations.find(
      (item) => item.id === conversationId,
    );

    if (!conversation) {
      return;
    }

    const sentAt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    }).format(new Date());

    updatedConversation = {
      ...conversation,
      preview: content,
      updatedAt: sentAt,
      isUnread: false,
      messages: [
        ...conversation.messages,
        {
          id: randomUUID(),
          authorName: "Vous",
          content,
          sentAt,
          isCurrentUser: true,
        },
      ],
    };

    const otherConversations = conversations.filter(
      (item) => item.id !== conversationId,
    );
    await writeConversations([updatedConversation, ...otherConversations]);
  });

  pendingUpdate = update.catch(() => undefined);
  await update;
  return updatedConversation;
}
