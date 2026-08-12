type TokenPayload = {
  id?: unknown;
};

// Lit seulement l'identifiant public contenu dans le jeton
export function getTokenUserId(token: string) {
  const encodedPayload = token.split(".")[1];

  if (!encodedPayload) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as TokenPayload;

    return typeof payload.id === "number" ? payload.id : null;
  } catch {
    return null;
  }
}
