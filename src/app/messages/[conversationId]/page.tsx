import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ConversationList } from "@/components/messages/conversation-list";
import { MessageConversation } from "@/components/messages/message-conversation";
import { dataProvider } from "@/data/data-provider";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Discussion",
};

export default async function ConversationPage(
  props: PageProps<"/messages/[conversationId]">,
) {
  const { conversationId } = await props.params;
  const [conversations, conversation] = await Promise.all([
    dataProvider.getConversations(),
    dataProvider.getConversationById(conversationId),
  ]);

  if (!conversation) {
    notFound();
  }

  return (
    <>
      {/* Affiche seulement la discussion sur mobile */}
      <div className="flex min-h-dvh flex-col bg-blanc lg:hidden">
        <SiteHeader />
        <main className="flex min-h-0 flex-1 flex-col">
          <div className="bg-blanc px-2 py-4">
            <Link
              href={ROUTES.messages}
              className="inline-flex h-9 items-center gap-1 rounded-[10px] bg-gris-light px-5 text-sm text-gris-dark"
            >
              <Image
                src="/img/icones/actions/retour.svg"
                alt=""
                width={8}
                height={6}
              />
              Retour
            </Link>
          </div>
          <div className="min-h-[620px] flex-1">
            <MessageConversation conversation={conversation} />
          </div>
        </main>
        <SiteFooter />
      </div>

      {/* Conserve les deux panneaux sur desktop */}
      <main className="hidden h-dvh bg-blanc p-4 lg:block">
        <div className="mx-auto grid h-full max-w-[1328px] grid-cols-[470px_1fr] overflow-hidden rounded-[10px] border border-gris-light">
          <ConversationList
            conversations={conversations}
            activeConversationId={conversation.id}
            compact
          />
          <MessageConversation conversation={conversation} />
        </div>
      </main>
    </>
  );
}
