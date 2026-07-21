import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ROUTES } from "@/lib/routes";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-light-orange">
      <SiteHeader />

      <main className="flex w-full flex-1 items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[104px] font-bold leading-none text-main-red">
            404
          </h1>
          <p className="mt-6 max-w-[330px] text-sm leading-[1.426]">
            Il semble que la page que vous cherchez ait pris des vacances... ou
            n’ait jamais existé.
          </p>

          <nav
            aria-label="Navigation depuis la page introuvable"
            className="mt-10 flex w-[200px] flex-col gap-[10px]"
          >
            <Link
              href={ROUTES.home}
              className="flex h-9 items-center justify-center rounded-[10px] bg-main-red text-sm text-blanc"
            >
              Accueil
            </Link>
            <Link
              href={`${ROUTES.home}#properties`}
              className="flex h-9 items-center justify-center rounded-[10px] bg-main-red text-sm text-blanc"
            >
              {/* Rejoint directement les cartes de la page d'accueil */}
              Logements
            </Link>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
