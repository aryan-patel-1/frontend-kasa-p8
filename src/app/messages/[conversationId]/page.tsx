import { PagePlaceholder } from "@/components/ui/page-placeholder";

export default async function ConversationPage(
  props: PageProps<"/messages/[conversationId]">,
) {
  const { conversationId } = await props.params;

  return (
    <PagePlaceholder
      eyebrow={`Conversation ${conversationId}`}
      title="Messagerie"
    />
  );
}
