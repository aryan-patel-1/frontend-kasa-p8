import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ConversationList } from "@/components/messages/conversation-list";
import { MessageConversation } from "@/components/messages/message-conversation";
import { dataProvider } from "@/data/data-provider";

export const metadata: Metadata = {
  title: "Messagerie",
  description: "Consultez vos conversations et envoyez des messages sur Kasa.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MessagesPage() {
  const conversations = await dataProvider.getConversations();
  const selectedConversation = conversations[0] ?? null;

  return (
    <div className="flex min-h-dvh flex-col bg-blanc">
      <div className="lg:hidden">
        <SiteHeader />
      </div>

      <main className="min-h-0 flex-1">
        {/* Affiche seulement la liste sur mobile */}
        <div className="px-4 pt-10 lg:hidden">
          <ConversationList conversations={conversations} />
        </div>

        {/* Réunit la liste et la discussion sur desktop */}
        <div className="hidden h-dvh p-4 lg:block">
          <div className="mx-auto grid h-full max-w-[1328px] grid-cols-[470px_1fr] overflow-hidden rounded-[10px] border border-gris-light">
            <ConversationList
              conversations={conversations}
              activeConversationId={selectedConversation?.id}
              compact
            />
            <MessageConversation conversation={selectedConversation} />
          </div>
        </div>
      </main>

      <div className="lg:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
