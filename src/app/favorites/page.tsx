import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PropertyCard } from "@/components/property/property-card";
import { dataProvider, USE_MOCK } from "@/data/data-provider";

export const metadata: Metadata = {
  title: "Favoris",
  description: "Retrouvez les logements ajoutés à vos favoris.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function FavoritesPage() {
  const favoriteProperties = await dataProvider.getFavoriteProperties();

  return (
    <div className="flex min-h-dvh flex-col items-center bg-light-orange">
      <SiteHeader />

      <main className="flex w-full flex-1 flex-col items-center px-4 pb-16 sm:px-6">
        <section className="mt-10 flex w-full max-w-[1114px] flex-col items-center md:mt-20">
          <div className="max-w-[500px] text-center">
            <h1 className="text-[32px] font-bold leading-[1.426] text-main-red">
              Vos favoris
            </h1>
            <p className="mt-3 text-sm leading-[1.426]">
              Retrouvez ici tous les logements que vous avez aimés.
              <br className="hidden sm:block" /> Prêts à réserver ? Un simple
              clic et votre prochain séjour est en route.
            </p>
          </div>

          {/* Préserve un état compréhensible quand la liste est vide */}
          {favoriteProperties.length > 0 ? (
            <div className="mt-10 grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-[72px]">
              {favoriteProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite
                  canUpdateFavorite={!USE_MOCK}
                  refreshAfterFavoriteUpdate
                />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm text-gris-dark md:mt-[72px]">
              Aucun logement dans vos favoris
            </p>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
