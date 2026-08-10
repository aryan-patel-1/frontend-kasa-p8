import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getStoredConversations } from "@/lib/conversation-store";

export async function GET() {
  const token = (await cookies()).get("kasa-token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Vous devez être connecté pour voir vos messages" },
      { status: 401 },
    );
  }

  try {
    return NextResponse.json(await getStoredConversations());
  } catch {
    return NextResponse.json(
      { error: "Impossible de charger les conversations" },
      { status: 500 },
    );
  }
}
