"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";

export function SiteHeader() {
  // Contrôle uniquement le menu plein écran sur mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex h-[85px] w-full shrink-0 items-center justify-between bg-blanc px-4 md:mt-10 md:h-[56px] md:w-[calc(100%-2rem)] md:max-w-[782px] md:rounded-[10px] md:px-10 md:shadow-[0_4px_4px_rgba(182,182,182,0.05)] lg:px-[100px]">
        <Link href={ROUTES.home} aria-label="Retour à l'accueil">
          <Image
            src="/img/logos/logo-kasa-mark.svg"
            alt=""
            width={47}
            height={54}
            className="h-[54px] w-[47px] md:hidden"
            priority
          />
          <Image
            src="/img/logos/logo-kasa.svg"
            alt="Kasa"
            width={163}
            height={58}
            className="hidden h-[40px] w-[113px] md:block"
            priority
          />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="order-first hidden items-center gap-7 text-sm md:flex"
        >
          <Link href={ROUTES.home}>Accueil</Link>
          <Link href={ROUTES.about}>À propos</Link>
        </nav>

        <div className="hidden items-center gap-7 md:flex">
          <Link
            href={ROUTES.addProperty}
            className="whitespace-nowrap text-sm text-main-red"
          >
            +Ajouter un logement
          </Link>

          <div className="flex w-[60px] items-center justify-center gap-2">
            <Link href={ROUTES.favorites} aria-label="Voir les favoris">
              <Image
                src="/img/icones/navigation/favoris.svg"
                alt=""
                width={16}
                height={16}
              />
            </Link>
            <Image
              src="/img/icones/navigation/separateur.svg"
              alt=""
              width={5}
              height={1}
              className="rotate-90"
            />
            <Link href={ROUTES.messages} aria-label="Accéder aux messages">
              <Image
                src="/img/icones/navigation/compte.svg"
                alt=""
                width={16}
                height={16}
              />
            </Link>
          </div>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
          className="flex size-[46px] items-center justify-center md:hidden"
        >
          <Image
            src="/img/icones/navigation/menu.svg"
            alt=""
            width={29}
            height={21}
          />
        </button>
      </header>

      {/* Monte le menu au-dessus de la page quand il est ouvert */}
      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 flex min-h-dvh flex-col bg-blanc px-4 md:hidden">
          <div className="flex h-[85px] items-center justify-between">
            <Link href={ROUTES.home} aria-label="Retour à l'accueil">
              <Image
                src="/img/logos/logo-kasa-mark.svg"
                alt=""
                width={47}
                height={54}
                className="h-[54px] w-[47px]"
                priority
              />
            </Link>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setIsMenuOpen(false)}
              className="relative flex size-[46px] items-center justify-center"
            >
              <span className="absolute h-[3px] w-8 rotate-45 rounded bg-noir" />
              <span className="absolute h-[3px] w-8 -rotate-45 rounded bg-noir" />
            </button>
          </div>

          <nav
            aria-label="Navigation mobile"
            className="mt-3 flex flex-col text-2xl"
          >
            <Link
              href={ROUTES.home}
              className="border-b border-gris-light py-6"
            >
              Accueil
            </Link>
            <Link
              href={ROUTES.about}
              className="border-b border-gris-light py-6"
            >
              À propos
            </Link>
            <Link
              href={ROUTES.messages}
              className="border-b border-gris-light py-6"
            >
              Messagerie
            </Link>
            <Link
              href={ROUTES.favorites}
              className="border-b border-gris-light py-6"
            >
              Favoris
            </Link>
            <Link
              href={ROUTES.addProperty}
              className="mt-4 flex h-9 w-[200px] items-center justify-center rounded-[10px] bg-main-red text-sm text-blanc"
            >
              Ajouter un logement
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
