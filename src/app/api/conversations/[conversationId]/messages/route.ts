import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { addStoredMessage } from "@/lib/conversation-store";

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
    const conversation = await addStoredMessage(
      conversationId,
      body.content.trim(),
    );

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation introuvable" },
        { status: 404 },
      );
    }

    return NextResponse.json(conversation, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Impossible d’envoyer le message" },
      { status: 500 },
    );
  }
}
