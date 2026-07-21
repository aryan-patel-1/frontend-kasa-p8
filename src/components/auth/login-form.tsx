import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function LoginForm() {
  // Le formulaire reste visuel tant que l'authentification n'existe pas
  return (
    <section className="flex w-full flex-col items-center gap-[38px] rounded-[10px] border border-gris-light bg-blanc px-4 py-8 md:h-[590px] md:w-[742px] md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <h1 className="whitespace-nowrap text-2xl font-bold leading-[1.426] text-main-red md:text-[32px]">
          Heureux de vous revoir
        </h1>
        <p className="max-w-[390px] text-sm leading-[1.426] text-noir">
          Connectez-vous pour retrouver vos réservations, vos annonces et tout
          ce qui rend vos séjours uniques.
        </p>
      </div>

      <form className="flex w-full flex-col items-center gap-[38px]">
        <div className="flex w-full flex-col gap-[22px] md:w-[360px]">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-[1.426]"
            >
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="h-10 rounded border border-gris-light bg-blanc px-2.5 outline-none transition focus:border-main-red focus:ring-1 focus:ring-main-red"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-[1.426]"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-10 rounded border border-gris-light bg-blanc px-2.5 outline-none transition focus:border-main-red focus:ring-1 focus:ring-main-red"
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[22px] md:w-[360px]">
          <Link
            href={ROUTES.home}
            className="flex h-9 w-[230px] items-center justify-center rounded-[10px] bg-main-red px-8 py-2 text-sm font-medium leading-[1.426] text-blanc transition hover:bg-dark-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
          >
            Se connecter
          </Link>

          <div className="flex w-full flex-col items-center gap-3 text-center text-sm leading-[1.426] text-main-red">
            <button type="button">Mot de passe oublié</button>
            <p>
              Pas encore de compte ?{" "}
              <Link href={ROUTES.signUp} className="font-medium">
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
