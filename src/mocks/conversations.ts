import type { Conversation } from "@/types/message";

// Simule une discussion tant que le backend ne gère pas la messagerie
export const mockConversations: Conversation[] = [
  {
    id: "nathalie-jean",
    participantId: 1,
    participantName: "Nathalie Jean",
    participantPicture: "/img/avatars/nathalie-jean.webp",
    preview: "Bonjour, votre appartement est-il disponible...",
    updatedAt: "11:04",
    isUnread: true,
    messages: [
      {
        id: "message-1",
        authorName: "Vous",
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        sentAt: "11:02",
        isCurrentUser: true,
      },
      {
        id: "message-2",
        authorName: "Nathalie Jean",
        content: "Bonjour, oui, le logement est disponible à ces dates.",
        sentAt: "11:04",
        isCurrentUser: false,
      },
    ],
  },
];
