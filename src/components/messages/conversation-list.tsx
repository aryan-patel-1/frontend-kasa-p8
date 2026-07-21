import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Conversation } from "@/types/message";

type ConversationListProps = Readonly<{
  conversations: Conversation[];
  activeConversationId?: string;
  compact?: boolean;
}>;

export function ConversationList({
  conversations,
  activeConversationId,
  compact = false,
}: ConversationListProps) {
  // Le mode compact adapte la liste au panneau desktop
  return (
    <section
      className={
        compact
          ? "h-full border-r border-gris-light bg-blanc px-4 pt-6"
          : "w-full"
      }
    >
      <Link
        href={ROUTES.home}
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

      <h1
        className={
          compact
            ? "mt-8 text-[32px] font-medium"
            : "mt-7 text-[32px] font-medium"
        }
      >
        Messages
      </h1>

      <div className="mt-5 border-t border-gris-light">
        {conversations.map((conversation) => (
          <Link
            key={conversation.id}
            href={ROUTES.conversation(conversation.id)}
            aria-label={`Ouvrir la discussion avec ${conversation.participantName}`}
            aria-current={
              activeConversationId === conversation.id ? "page" : undefined
            }
            className={`-mx-4 grid grid-cols-[44px_1fr_auto] items-center gap-5 border-b border-gris-light px-4 py-2 focus-visible:outline-2 focus-visible:outline-main-red ${
              activeConversationId === conversation.id ? "bg-light-orange" : ""
            }`}
          >
            {conversation.participantPicture ? (
              <Image
                src={conversation.participantPicture}
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-md object-cover"
              />
            ) : (
              <span className="size-11 rounded-md bg-gris-light" />
            )}
            <span className="min-w-0">
              <span className="block text-sm font-medium">
                {conversation.participantName}
              </span>
              <span className="mt-1 block truncate text-xs text-gris-dark">
                {conversation.preview}
              </span>
            </span>
            <span className="flex flex-col items-end gap-3 text-[10px] text-gris-dark">
              {conversation.updatedAt}
              {conversation.isUnread ? (
                <Image
                  src="/img/icones/messagerie/non-lu.svg"
                  alt="Message non lu"
                  width={6}
                  height={6}
                />
              ) : null}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
