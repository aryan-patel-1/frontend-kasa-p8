export const ROUTES = {
  home: "/",
  about: "/about",
  addProperty: "/add-property",
  favorites: "/favorites",
  login: "/login",
  messages: "/messages",
  signUp: "/sign-up",
  property: (id: string) => `/properties/${id}`,
  conversation: (conversationId: string) =>
    `/messages/${conversationId}`,
} as const;
