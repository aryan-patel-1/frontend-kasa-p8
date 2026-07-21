import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center bg-light-orange">
      <SiteHeader />
      {/* Centre le formulaire quelle que soit la hauteur de l'écran */}
      <main className="flex w-full flex-1 items-center justify-center px-4 py-[94px] md:py-0">
        <LoginForm />
      </main>
      <SiteFooter />
    </div>
  );
}
