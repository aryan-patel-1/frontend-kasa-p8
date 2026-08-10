"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import type { Conversation } from "@/types/message";

type MessageConversationProps = Readonly<{
  conversation: Conversation | null;
}>;

export function MessageConversation({
  conversation,
}: MessageConversationProps) {
  const router = useRouter();
  const [sentConversation, setSentConversation] =
    useState<Conversation | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const displayedConversation =
    sentConversation &&
    conversation &&
    sentConversation.id === conversation.id &&
    sentConversation.messages.length >= conversation.messages.length
      ? sentConversation
      : conversation;

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = messageContent.trim();

    if (!displayedConversation || !content || isSending) {
      return;
    }

    setErrorMessage("");
    setIsSending(true);

    try {
      const response = await fetch(
        `/api/conversations/${encodeURIComponent(displayedConversation.id)}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        },
      );
      const result = (await response.json()) as Conversation & {
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(result.error ?? "L’envoi du message a échoué");
        return;
      }

      setSentConversation(result);
      setMessageContent("");
      router.refresh();
    } catch {
      setErrorMessage("Le serveur est momentanément indisponible");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="flex h-full min-h-0 flex-col bg-light-orange">
      <div
        aria-live="polite"
        className="flex-1 space-y-10 overflow-y-auto px-2 py-10 sm:px-10"
      >
        {displayedConversation ? (
          displayedConversation.messages.map((message) => (
            <article
              key={message.id}
              className={`flex max-w-[360px] items-start gap-2 ${
                message.isCurrentUser ? "ml-auto flex-row-reverse" : ""
              }`}
            >
              <span className="mt-1 size-7 shrink-0 rounded-md bg-gris-dark" />
              <div>
                <p
                  className={`flex items-center gap-1 text-[8px] text-gris-dark ${
                    message.isCurrentUser ? "justify-end" : ""
                  }`}
                >
                  {message.authorName}
                  <Image
                    src="/img/icones/messagerie/puce.svg"
                    alt=""
                    width={4}
                    height={4}
                  />
                  {message.sentAt}
                </p>
                <p
                  className={`mt-2 rounded-[20px] px-3 py-3 text-sm leading-[1.426] ${
                    message.isCurrentUser
                      ? "bg-main-red text-blanc"
                      : "border border-gris-light bg-blanc"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-sm text-gris-dark">
            Sélectionnez une conversation
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gris-light bg-blanc px-5 py-5"
      >
        {errorMessage ? (
          <p role="alert" className="mb-2 text-sm text-main-red">
            {errorMessage}
          </p>
        ) : null}
        <div className="flex h-11 items-center rounded-[10px] border border-gris-light bg-blanc pl-4">
          <label htmlFor="message" className="sr-only">
            Votre message
          </label>
          <input
            id="message"
            name="message"
            type="text"
            maxLength={2000}
            autoComplete="off"
            value={messageContent}
            disabled={!displayedConversation || isSending}
            onChange={(event) => setMessageContent(event.target.value)}
            placeholder="Envoyer un message"
            className="h-full min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-gris-dark disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={
              !displayedConversation || !messageContent.trim() || isSending
            }
            aria-label="Envoyer le message"
            className="mr-2 flex size-8 shrink-0 items-center justify-center rounded-md bg-main-red disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Image
              src="/img/icones/actions/envoyer.svg"
              alt=""
              width={8}
              height={6}
              className="rotate-90"
            />
          </button>
        </div>
      </form>
    </section>
  );
}
