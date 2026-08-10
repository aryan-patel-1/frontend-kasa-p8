import type { Conversation } from "@/types/message";
import {
  getStoredConversationById,
  getStoredConversations,
} from "@/lib/conversation-store";

// Lit la même source persistante que les routes API de la messagerie
export async function getApiConversations(): Promise<Conversation[]> {
  return getStoredConversations();
}

export async function getApiConversationById(
  id: string,
): Promise<Conversation | null> {
  return getStoredConversationById(id);
}
