import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez la mission de Kasa et notre engagement pour des séjours uniques.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Kasa",
    title: "À propos | Kasa",
    description:
      "Découvrez la mission de Kasa et notre engagement pour des séjours uniques.",
    url: "/about",
    images: [
      {
        url: "/img/a-propos/hero.webp",
        alt: "Maison en bois présentée par Kasa",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-light-orange">
      <SiteHeader />

      <main className="flex w-full flex-1 flex-col items-center px-4 pb-28 sm:px-6 md:pb-10 lg:px-0">
        <section className="mt-10 flex w-full max-w-[1116px] flex-col items-center">
          <div className="max-w-[720px] text-center">
            <h1 className="text-[32px] font-bold leading-[1.426] text-main-red">
              À propos
            </h1>
            <p className="mt-2 text-sm leading-[1.426]">
              Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où
              se sentir bien.
            </p>
            <p className="mt-5 text-sm leading-[1.426] md:mt-6">
              Depuis notre création, nous mettons en relation des voyageurs en
              quête d’authenticité avec des hôtes passionnés qui aiment partager
              leur région et leurs bonnes adresses.
            </p>
          </div>

          <div className="relative mt-10 h-[458px] w-full overflow-hidden rounded-[20px] md:rounded-[10px]">
            <Image
              src="/img/a-propos/hero.webp"
              alt="Maison en bois entourée d'arbres"
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 32px), 1116px"
              className="object-cover"
            />
          </div>
        </section>

        {/* Change l'ordre visuel sans dupliquer le contenu */}
        <section className="mt-12 grid w-full max-w-[1116px] grid-cols-1 gap-y-5 md:mt-10 md:grid-cols-[minmax(0,1fr)_494px] md:grid-rows-[auto_1fr] md:gap-x-8 md:gap-y-0">
          <div className="md:pt-28">
            <h2 className="text-lg font-bold leading-[1.426] text-main-red">
              Notre mission est simple :
            </h2>
            <ol className="mt-5 list-decimal space-y-5 pl-5 text-sm leading-[1.426]">
              <li>Offrir une plateforme fiable et simple d’utilisation</li>
              <li>Proposer des hébergements variés et de qualité</li>
              <li>
                Favoriser des échanges humains et chaleureux entre hôtes et
                voyageurs
              </li>
            </ol>
          </div>

          <div className="relative h-[458px] w-full overflow-hidden rounded-[20px] md:col-start-2 md:row-span-2 md:row-start-1 md:rounded-[10px]">
            <Image
              src="/img/a-propos/mission.webp"
              alt="Chalet chaleureux à la montagne"
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), 494px"
              className="object-cover"
            />
          </div>

          <p className="text-lg font-medium leading-[1.426] text-main-red md:self-start md:pt-4">
            Que vous cherchiez un appartement cosy en centre-ville, une maison
            en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour
            que chaque séjour devienne un souvenir inoubliable.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
