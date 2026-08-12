import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { USE_MOCK } from "@/lib/config";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Inscription",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  if (USE_MOCK) {
    redirect(ROUTES.home);
  }

  return (
    <div className="flex min-h-[982px] flex-1 flex-col items-center bg-light-orange md:min-h-[1042px]">
      <SiteHeader />
      {/* Laisse assez de hauteur au formulaire sur les petits écrans */}
      <main className="flex w-full flex-1 items-center justify-center px-4">
        <SignUpForm />
      </main>
      <SiteFooter />
    </div>
  );
}
