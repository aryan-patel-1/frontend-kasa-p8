import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  addApiConversationMessage,
  ConversationApiError,
} from "@/services/conversations";

export async function POST(
  request: Request,
  context: RouteContext<"/api/conversations/[conversationId]/messages">,
) {
  const token = (await cookies()).get("kasa-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour envoyer un message" },
      { status: 401 },
    );
  }

  let body: { content?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Le message envoyé est invalide" },
      { status: 400 },
    );
  }

  if (
    typeof body.content !== "string" ||
    !body.content.trim() ||
    body.content.trim().length > 2000
  ) {
    return NextResponse.json(
      { error: "Le message doit contenir entre 1 et 2000 caractères" },
      { status: 400 },
    );
  }

  const { conversationId } = await context.params;

  try {
    const conversation = await addApiConversationMessage(
      conversationId,
      body.content.trim(),
    );

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    if (error instanceof ConversationApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { error: "Impossible d’envoyer le message" },
      { status: 500 },
    );
  }
}
