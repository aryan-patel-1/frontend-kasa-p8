import { cookies } from "next/headers";
import { getApiUrl } from "@/lib/api-url";
import type { Conversation } from "@/types/message";
import type { Host } from "@/types/property";

type BackendError = {
  error?: string;
};

export class ConversationApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function getToken() {
  return (await cookies()).get("kasa-token")?.value;
}

async function getErrorMessage(response: Response) {
  try {
    const result = (await response.json()) as BackendError;
    return result.error;
  } catch {
    return undefined;
  }
}

// Récupère les conversations du compte identifié par le cookie
export async function getApiConversations(): Promise<Conversation[]> {
  const token = await getToken();

  if (!token) {
    return [];
  }

  const response = await fetch(getApiUrl("/api/conversations"), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    return [];
  }

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer les conversations (${response.status})`,
    );
  }

  return response.json() as Promise<Conversation[]>;
}

export async function getApiConversationById(
  id: string,
): Promise<Conversation | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const response = await fetch(
    getApiUrl(`/api/conversations/${encodeURIComponent(id)}`),
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );

  if (
    response.status === 401 ||
    response.status === 403 ||
    response.status === 404
  ) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer la conversation (${response.status})`,
    );
  }

  return response.json() as Promise<Conversation>;
}

// Réutilise la conversation existante avec cet hôte ou la crée
export async function getOrCreateApiConversation(
  participant: Host,
): Promise<Conversation> {
  const token = await getToken();

  if (!token) {
    throw new ConversationApiError("Vous devez être connecté", 401);
  }

  if (!participant.id) {
    throw new ConversationApiError("Cet hôte est introuvable", 400);
  }

  const response = await fetch(getApiUrl("/api/conversations"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ participant_id: participant.id }),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new ConversationApiError(
      message ?? "Impossible d’ouvrir la conversation",
      response.status,
    );
  }

  return response.json() as Promise<Conversation>;
}

// Envoie un message sans exposer le jeton au navigateur
export async function addApiConversationMessage(
  conversationId: string,
  content: string,
): Promise<Conversation> {
  const token = await getToken();

  if (!token) {
    throw new ConversationApiError("Vous devez être connecté", 401);
  }

  const response = await fetch(
    getApiUrl(
      `/api/conversations/${encodeURIComponent(conversationId)}/messages`,
    ),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const message = await getErrorMessage(response);
    throw new ConversationApiError(
      message ?? "Impossible d’envoyer le message",
      response.status,
    );
  }

  return response.json() as Promise<Conversation>;
}
