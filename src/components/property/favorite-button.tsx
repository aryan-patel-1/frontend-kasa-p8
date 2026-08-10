"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";

type FavoriteButtonProps = Readonly<{
  propertyId: string;
  propertyTitle: string;
  initialIsFavorite: boolean;
  enabled: boolean;
  refreshAfterUpdate: boolean;
}>;

export function FavoriteButton({
  propertyId,
  propertyTitle,
  initialIsFavorite,
  enabled,
  refreshAfterUpdate,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFavorite() {
    if (!enabled || isLoading) {
      return;
    }

    const nextIsFavorite = !isFavorite;
    setIsFavorite(nextIsFavorite);
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/favorites/${encodeURIComponent(propertyId)}`,
        {
          method: nextIsFavorite ? "POST" : "DELETE",
        },
      );

      if (response.status === 401) {
        setIsFavorite(!nextIsFavorite);
        router.push(ROUTES.login);
        return;
      }

      if (!response.ok) {
        throw new Error();
      }

      // Retire la carte de la page favoris après une suppression
      if (refreshAfterUpdate) {
        router.refresh();
      }
    } catch {
      setIsFavorite(!nextIsFavorite);
      setErrorMessage("La modification du favori a échoué");
    } finally {
      setIsLoading(false);
    }
  }

  const label = isFavorite
    ? `Retirer ${propertyTitle} des favoris`
    : `Ajouter ${propertyTitle} aux favoris`;

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-pressed={isFavorite}
        aria-busy={isLoading}
        disabled={!enabled || isLoading}
        onClick={handleFavorite}
        className={`group absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red ${
          isFavorite ? "bg-main-red" : "bg-blanc hover:bg-main-red"
        } ${isLoading ? "opacity-70" : ""}`}
      >
        {isFavorite ? (
          <Image
            src="/img/icones/logement/favori-actif.svg"
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
        ) : (
          <>
            <Image
              src="/img/icones/logement/favori.svg"
              alt=""
              width={16}
              height={16}
              className="size-4 transition-opacity duration-200 group-hover:opacity-0"
            />
            <Image
              src="/img/icones/logement/favori-actif.svg"
              alt=""
              width={16}
              height={16}
              className="absolute size-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </>
        )}
      </button>

      {errorMessage ? (
        <span role="alert" className="sr-only">
          {errorMessage}
        </span>
      ) : null}
    </>
  );
}
