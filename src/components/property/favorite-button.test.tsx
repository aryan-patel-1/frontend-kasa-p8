import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { FavoriteButton } from "@/components/property/favorite-button";

// Garde le vrai fetch pour le remettre après chaque test
const originalFetch = globalThis.fetch;

afterEach(() => {
  // Nettoie le composant affiché dans le faux navigateur
  cleanup();

  // Évite que le faux fetch soit utilisé par le test suivant
  globalThis.fetch = originalFetch;
});

test("ajoute le logement aux favoris au clic", () => {
  // Mémorise la méthode envoyée par le composant
  let requestMethod = "";

  // Remplace l'appel au backend par une réponse réussie
  globalThis.fetch = async (_url, options) => {
    requestMethod = options?.method ?? "";
    return new Response(null, { status: 200 });
  };

  // Affiche un bouton dont le logement n'est pas encore favori
  render(
    <FavoriteButton
      propertyId="logement-1"
      propertyTitle="Appartement cosy"
      initialIsFavorite={false}
      enabled
      refreshAfterUpdate={false}
    />,
  );

  // Reproduit le clic de l'utilisateur
  fireEvent.click(screen.getByRole("button"));

  // Le bouton devient actif après le clic
  expect(screen.getByRole("button").getAttribute("aria-pressed")).toBe("true");

  // POST correspond à l'ajout du favori
  expect(requestMethod).toBe("POST");
});

test("retire le logement des favoris au clic", () => {
  // Mémorise la méthode envoyée par le composant
  let requestMethod = "";

  // Remplace l'appel au backend par une réponse réussie
  globalThis.fetch = async (_url, options) => {
    requestMethod = options?.method ?? "";
    return new Response(null, { status: 200 });
  };

  // Affiche un bouton dont le logement est déjà favori
  render(
    <FavoriteButton
      propertyId="logement-1"
      propertyTitle="Appartement cosy"
      initialIsFavorite
      enabled
      refreshAfterUpdate={false}
    />,
  );

  // Reproduit le clic de l'utilisateur
  fireEvent.click(screen.getByRole("button"));

  // Le bouton devient inactif après le clic
  expect(screen.getByRole("button").getAttribute("aria-pressed")).toBe("false");

  // DELETE correspond au retrait du favori
  expect(requestMethod).toBe("DELETE");
});
