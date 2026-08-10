import { notFound, redirect } from "next/navigation";
import { dataProvider } from "@/data/data-provider";
import { getOrCreateStoredConversation } from "@/lib/conversation-store";
import { ROUTES } from "@/lib/routes";

export default async function ContactHostPage(
  props: PageProps<"/messages/contact/[propertyId]">,
) {
  const { propertyId } = await props.params;
  const property = await dataProvider.getPropertyById(propertyId);

  if (!property) {
    notFound();
  }

  // Réutilise la discussion pour ne pas créer de doublon avec le même hôte
  const conversation = await getOrCreateStoredConversation(property.host);
  redirect(ROUTES.conversation(conversation.id));
}
