import type { Conversation } from "@/types/message";

// Réserve les appels réseau pour la future messagerie
export async function getApiConversations(): Promise<Conversation[]> {
  throw new Error("La récupération API des conversations reste à implémenter");
}

export async function getApiConversationById(
  id: string,
): Promise<Conversation | null> {
  throw new Error(
    `La récupération API de la conversation ${id} reste à implémenter`,
  );
}
