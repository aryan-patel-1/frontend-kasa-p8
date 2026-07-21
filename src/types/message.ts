// Décrit un message déjà prêt à être affiché
export type Message = {
  id: string;
  authorName: string;
  content: string;
  sentAt: string;
  isCurrentUser: boolean;
};

// Regroupe le résumé et les messages d'une même discussion
export type Conversation = {
  id: string;
  participantName: string;
  participantPicture: string | null;
  preview: string;
  updatedAt: string;
  isUnread: boolean;
  messages: Message[];
};
