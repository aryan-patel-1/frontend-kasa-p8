import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PropertyCard } from "@/components/property/property-card";
import { dataProvider, USE_MOCK } from "@/data/data-provider";

// Décrit les étapes affichées sans dépendre d'une API
const steps = [
  {
    title: "Recherchez",
    description:
      "Entrez votre destination, vos dates et laissez Kasa faire le reste",
  },
  {
    title: "Réservez",
    description:
      "Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.",
  },
  {
    title: "Vivez l’expérience",
    description:
      "Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.",
  },
];

export default async function HomePage() {
  // Récupère tous les logements du backend pour construire les cartes
  const [properties, favoriteProperties] = await Promise.all([
    dataProvider.getProperties(),
    dataProvider.getFavoriteProperties(),
  ]);
  const favoritePropertyIds = new Set(
    favoriteProperties.map((property) => property.id),
  );

  return (
    <div className="flex min-h-dvh flex-col items-center bg-light-orange">
      <SiteHeader />

      <main className="flex w-full flex-col items-center px-4 pb-10 sm:px-6 lg:px-0">
        <section className="mt-10 flex w-full max-w-[1115px] flex-col items-center">
          <div className="max-w-[620px] text-center">
            <h1 className="text-2xl font-bold leading-[1.426] text-main-red md:text-[32px]">
              Chez vous, partout et ailleurs
            </h1>
            <p className="mt-2 text-sm leading-[1.426]">
              Avec Kasa, vivez des séjours uniques dans des hébergements
              chaleureux, sélectionnés avec soin par nos hôtes.
            </p>
          </div>

          <div className="relative mt-10 h-[230px] w-full overflow-hidden rounded-[10px] sm:h-[320px] lg:h-[458px]">
            <Image
              src="/img/accueil/hero-accueil.webp"
              alt="Maison moderne au milieu des dunes"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 1115px"
              className="object-cover"
            />
          </div>
        </section>

        <section
          id="properties"
          aria-label="Logements disponibles"
          className="mt-10 w-full max-w-[1113px]"
        >
          {/* Passe de une à trois colonnes selon la largeur */}
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favoritePropertyIds.has(property.id)}
                canUpdateFavorite={!USE_MOCK}
              />
            ))}
          </div>
        </section>

        <section className="mt-10 flex w-full max-w-[1114px] flex-col items-center rounded-[10px] bg-blanc px-4 py-10 text-center sm:px-6 lg:min-h-[409px] lg:px-10">
          <h2 className="text-2xl font-bold leading-[1.426] md:text-[24px]">
            Comment ça marche ?
          </h2>
          <p className="mt-2 max-w-[1034px] text-sm leading-[1.426]">
            Que vous partiez pour un week-end improvisé, des vacances en
            famille ou un voyage professionnel, Kasa vous aide à trouver un lieu
            qui vous ressemble.
          </p>

          <div className="mt-10 grid w-full max-w-[842px] grid-cols-1 gap-4 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.title}
                className="flex min-h-[160px] flex-col justify-center rounded-[10px] bg-main-red px-[22px] py-8 text-left text-blanc lg:min-h-[199px] lg:justify-start lg:py-11"
              >
                <h3 className="text-xl font-medium leading-[1.426]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.426]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
