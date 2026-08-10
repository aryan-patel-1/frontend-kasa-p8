import type { Conversation } from "@/types/message";
import {
  getStoredConversationById,
  getStoredConversations,
} from "@/lib/conversation-store";

// Lit la source persistante partagée avec les routes de la messagerie
export async function getApiConversations(): Promise<Conversation[]> {
  return getStoredConversations();
}

export async function getApiConversationById(
  id: string,
): Promise<Conversation | null> {
  return getStoredConversationById(id);
}
