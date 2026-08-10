import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";
import { ROUTES } from "@/lib/routes";

// Réutilise le même pied de page sur toutes les pages publiques
export function SiteFooter() {
  return (
    <footer className="flex min-h-[96px] w-full shrink-0 flex-col items-center justify-between gap-4 border-t border-gris-light bg-blanc px-4 py-4 sm:flex-row sm:px-10 md:min-h-[69px]">
      <Link href={ROUTES.home} aria-label="Retour à l'accueil">
        <Image
          src="/img/logos/logo-kasa-mark.svg"
          alt=""
          width={47}
          height={54}
          className="h-[54px] w-[47px]"
        />
      </Link>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <p className="whitespace-nowrap text-center text-xs font-medium text-gris-dark">
          © 2025 Kasa. All rights reserved
        </p>
        <LogoutButton />
      </div>
    </footer>
  );
}
