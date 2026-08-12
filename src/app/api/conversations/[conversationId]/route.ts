import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getApiConversationById } from "@/services/conversations";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/conversations/[conversationId]">,
) {
  const token = (await cookies()).get("kasa-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour voir cette conversation" },
      { status: 401 },
    );
  }

  const { conversationId } = await context.params;

  try {
    const conversation = await getApiConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation introuvable" },
        { status: 404 },
      );
    }

    return NextResponse.json(conversation);
  } catch {
    return NextResponse.json(
      { error: "Impossible de charger la conversation" },
      { status: 500 },
    );
  }
}
