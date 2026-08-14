"use client";

import Link from "next/link";
import { SubmitEvent, useState } from "react";
import { ROUTES } from "@/lib/routes";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      // Passe par Next.js pour garder le jeton hors du navigateur
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error ?? "La connexion a échoué");
        return;
      }

      // Recharge le document pour que Safari envoie le nouveau cookie
      window.location.assign(ROUTES.home);
    } catch {
      setErrorMessage("Le serveur est momentanément indisponible");
    } finally {
      setIsLoading(false);
    }
  }

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

      <form
        className="flex w-full flex-col items-center gap-[38px]"
        onSubmit={handleSubmit}
      >
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
              required
              disabled={isLoading}
              className="h-10 rounded border border-gris-light bg-blanc px-2.5 outline-none transition-[border-color,box-shadow] focus:border-main-red focus:ring-1 focus:ring-main-red"
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
              required
              disabled={isLoading}
              className="h-10 rounded border border-gris-light bg-blanc px-2.5 outline-none transition-[border-color,box-shadow] focus:border-main-red focus:ring-1 focus:ring-main-red"
            />
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
            className="flex h-9 w-[230px] items-center justify-center rounded-[10px] bg-main-red px-8 py-2 text-sm font-medium leading-[1.426] text-blanc transition-[background-color] hover:bg-dark-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
          >
            {isLoading ? "Connexion…" : "Se connecter"}
          </button>

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
