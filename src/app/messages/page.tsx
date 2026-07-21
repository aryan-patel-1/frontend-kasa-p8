import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ConversationList } from "@/components/messages/conversation-list";
import { MessageConversation } from "@/components/messages/message-conversation";
import { dataProvider } from "@/data/data-provider";

export const metadata: Metadata = {
  title: "Messagerie",
  description: "Consultez votre discussion de démonstration Kasa.",
};

export default async function MessagesPage() {
  const conversations = await dataProvider.getConversations();
  const selectedConversation = conversations[0] ?? null;

  return (
    <>
      {/* Sépare la liste et la discussion sur mobile */}
      <div className="flex min-h-dvh flex-col bg-blanc lg:hidden">
        <SiteHeader />
        <main className="flex-1 px-4 pt-10">
          <ConversationList conversations={conversations} />
        </main>
        <SiteFooter />
      </div>

      {/* Réunit la liste et la discussion sur desktop */}
      <main className="hidden h-dvh bg-blanc p-4 lg:block">
        <div className="mx-auto grid h-full max-w-[1328px] grid-cols-[470px_1fr] overflow-hidden rounded-[10px] border border-gris-light">
          <ConversationList
            conversations={conversations}
            activeConversationId={selectedConversation?.id}
            compact
          />
          <MessageConversation conversation={selectedConversation} />
        </div>
      </main>
    </>
  );
}
