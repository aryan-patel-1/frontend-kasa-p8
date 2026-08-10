"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { ROUTES } from "@/lib/routes";

export function SignUpForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      // Envoie les champs à la route Next.js reliée au backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error ?? "L’inscription a échoué");
        return;
      }

      // Affiche l’accueil après la création du compte
      router.push(ROUTES.home);
      router.refresh();
    } catch {
      setErrorMessage("Le serveur est momentanément indisponible");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex h-[742px] w-full flex-col items-center gap-[38px] rounded-[10px] border border-gris-light bg-blanc px-4 py-8 md:h-[797px] md:w-[742px] md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold leading-[1.426] text-main-red md:whitespace-nowrap md:text-[32px]">
          Rejoignez la communauté Kasa
        </h1>
        <p className="w-full max-w-[488px] text-sm leading-[1.426] text-noir">
          Créez votre compte et commencez à voyager autrement : réservez des
          logements uniques, découvrez de nouvelles destinations et partagez
          vos propres lieux avec d’autres voyageurs.
        </p>
      </div>

      <form
        className="flex w-full flex-col items-center gap-[38px]"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-[22px] md:w-[360px]">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="last-name"
              className="text-sm font-medium leading-[1.426]"
            >
              Nom
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              disabled={isLoading}
              className="h-10 rounded border border-gris-light bg-blanc px-2.5 outline-none transition focus:border-main-red focus:ring-1 focus:ring-main-red"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="first-name"
              className="text-sm font-medium leading-[1.426]"
            >
              Prénom
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              disabled={isLoading}
              className="h-10 rounded border border-gris-light bg-blanc px-2.5 outline-none transition focus:border-main-red focus:ring-1 focus:ring-main-red"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="sign-up-email"
              className="text-sm font-medium leading-[1.426]"
            >
              Adresse email
            </label>
            <input
              id="sign-up-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              className="h-10 rounded border border-gris-light bg-blanc px-2.5 outline-none transition focus:border-main-red focus:ring-1 focus:ring-main-red"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="sign-up-password"
              className="text-sm font-medium leading-[1.426]"
            >
              Mot de passe
            </label>
            <input
              id="sign-up-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              disabled={isLoading}
              className="h-10 rounded border border-gris-light bg-blanc px-2.5 outline-none transition focus:border-main-red focus:ring-1 focus:ring-main-red"
            />
          </div>

          <div className="flex min-h-[25px] items-center gap-2.5 px-2.5 text-xs text-gris-dark">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              disabled={isLoading}
              className="size-3 accent-main-red"
            />
            <label htmlFor="terms">
              J’accepte les{" "}
              <span className="underline">
                conditions générales d’utilisation
              </span>
            </label>
          </div>

          {errorMessage ? (
            <p role="alert" className="text-sm text-main-red">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="flex w-full flex-col items-center gap-[22px] md:w-[360px]">
          <button
            type="submit"
            disabled={isLoading}
            className="h-9 w-[230px] rounded-[10px] bg-main-red px-8 py-2 text-sm font-medium leading-[1.426] text-blanc transition hover:bg-dark-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
          >
            {isLoading ? "Inscription…" : "S’inscrire"}
          </button>

          <p className="text-center text-sm leading-[1.426] text-main-red">
            Déjà membre ?{" "}
            <Link href={ROUTES.login} className="font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
