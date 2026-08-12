import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AddPropertyForm } from "@/components/property/add-property-form";
import { dataProvider } from "@/data/data-provider";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Ajouter une propriété",
  description: "Créez une nouvelle annonce de logement sur Kasa.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AddPropertyPage() {
  const { equipments, categories } =
    await dataProvider.getPropertyFormOptions();

  return (
    <div className="flex min-h-dvh flex-col items-center bg-light-orange">
      <SiteHeader />

      <main className="w-full max-w-[1168px] flex-1 px-4 pb-10 lg:px-0">
        <Link
          href={ROUTES.home}
          className="mt-7 inline-flex h-9 items-center gap-1 rounded-[10px] bg-gris-light px-5 text-sm text-gris-dark lg:mt-10"
        >
          <Image
            src="/img/icones/actions/retour.svg"
            alt=""
            width={8}
            height={6}
          />
          Retour
        </Link>

        <AddPropertyForm
          equipments={equipments}
          categories={categories}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
