import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { dataProvider, USE_MOCK } from "@/data/data-provider";
import { getTokenUserId } from "@/lib/auth-token";
import { ROUTES } from "@/lib/routes";
import { getOrCreateApiConversation } from "@/services/conversations";

export const metadata: Metadata = {
  title: "Contacter l’hôte",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ContactHostPage(
  props: PageProps<"/messages/contact/[propertyId]">,
) {
  const { propertyId } = await props.params;
  const property = await dataProvider.getPropertyById(propertyId);

  if (!property) {
    notFound();
  }

  if (USE_MOCK) {
    const conversations = await dataProvider.getConversations();
    const conversation = conversations.find(
      (item) => item.participantId === property.host.id,
    );

    redirect(
      conversation ? ROUTES.conversation(conversation.id) : ROUTES.messages,
    );
  }

  const token = (await cookies()).get("kasa-token")?.value;

  if (token && getTokenUserId(token) === property.host.id) {
    redirect(ROUTES.property(property.id));
  }

  // Réutilise la discussion pour ne pas créer de doublon avec le même hôte
  const conversation = await getOrCreateApiConversation(property.host);
  redirect(ROUTES.conversation(conversation.id));
}
