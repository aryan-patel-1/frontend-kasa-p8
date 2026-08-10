import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { dataProvider } from "@/data/data-provider";
import { ROUTES } from "@/lib/routes";

export async function generateMetadata(
  props: PageProps<"/properties/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  // Utilise le logement pour renseigner le titre de l'onglet
  const property = await dataProvider.getPropertyById(id);

  return {
    title: property?.title ?? "Logement introuvable",
    description: property?.description,
  };
}

export default async function PropertyPage(
  props: PageProps<"/properties/[id]">,
) {
  const { id } = await props.params;
  // Utilise l'identifiant placé dans le lien de chaque carte
  const property = await dataProvider.getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Limite la galerie aux cinq emplacements de la maquette
  const galleryPictures = [property.cover, ...property.pictures]
    .filter((picture): picture is string => picture !== null)
    .slice(0, 5);

  return (
    <div className="flex min-h-dvh flex-col items-center bg-light-orange">
      <SiteHeader />

      <main className="w-full max-w-[970px] flex-1 px-4 pb-28 lg:mt-[102px] lg:px-0 lg:pb-20">
        <Link
          href={ROUTES.home}
          className="mt-3 inline-flex h-9 items-center gap-1 rounded-[10px] bg-gris-light px-5 text-sm text-gris-dark lg:mt-0"
        >
          <Image
            src="/img/icones/actions/retour.svg"
            alt=""
            width={8}
            height={6}
          />
          Retour
        </Link>

        <div className="mt-[10px] border-t border-gris-light pt-6 lg:mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[616px_344px] lg:items-start lg:gap-[10px]">
            <div>
              <section
                aria-label="Photos du logement"
                className="grid grid-cols-4 gap-2 lg:h-[358px] lg:grid-cols-[303px_147px_147px] lg:grid-rows-2 lg:gap-[10px]"
              >
                {/* La première image occupe toute la hauteur sur desktop */}
                {galleryPictures.length > 0 ? (
                  galleryPictures.map((picture, index) => (
                    <div
                      key={picture}
                      className={
                        index === 0
                          ? "relative col-span-4 h-[422px] overflow-hidden rounded-[10px] lg:col-span-1 lg:row-span-2 lg:h-auto"
                          : "relative h-[110px] overflow-hidden rounded-[8px] lg:h-auto lg:rounded-[10px]"
                      }
                    >
                      <Image
                        src={picture}
                        alt={
                          index === 0
                            ? property.title
                            : `Vue ${index + 1} de ${property.title}`
                        }
                        fill
                        priority={index === 0}
                        sizes={
                          index === 0
                            ? "(max-width: 767px) calc(100vw - 32px), 303px"
                            : "(max-width: 767px) 25vw, 147px"
                        }
                        className="object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p className="col-span-4 flex h-[422px] items-center justify-center rounded-[10px] bg-gris-light text-sm text-gris-dark lg:col-span-3 lg:h-[358px]">
                    Aucune photo disponible
                  </p>
                )}
              </section>

              <section className="mt-[10px] rounded-[10px] border border-gris-light bg-blanc px-6 py-7 lg:min-h-[489px]">
                <h1 className="text-2xl font-medium leading-[1.426]">
                  {property.title}
                </h1>

                <p className="mt-4 flex items-center gap-3 text-sm text-gris-dark">
                  <Image
                    src="/img/icones/logement/localisation.svg"
                    alt=""
                    width={10}
                    height={13}
                  />
                  {property.location}
                </p>

                <p className="mt-8 max-w-[560px] text-sm leading-[1.426]">
                  {property.description}
                </p>

                <h2 className="mt-8 text-sm font-medium">Équipements</h2>
                <ul className="mt-4 flex max-w-[330px] flex-wrap gap-2">
                  {property.equipments.map((equipment) => (
                    <li
                      key={equipment}
                      className="flex h-8 min-w-[100px] items-center justify-center rounded bg-gris-light px-3 text-xs text-gris-dark"
                    >
                      {equipment}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-10 text-sm font-medium">Catégorie</h2>
                <ul className="mt-4 flex flex-wrap gap-4">
                  {property.tags.map((tag) => (
                    <li
                      key={tag}
                      className="flex h-8 min-w-[88px] items-center justify-center rounded bg-gris-light px-4 text-xs text-gris-dark"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="rounded-[10px] border border-gris-light bg-blanc px-6 py-7 lg:min-h-[280px]">
              <h2 className="text-base font-medium">Votre hôte</h2>

              <div className="mt-6 flex items-center gap-5">
                {/* La photo vient du champ host.picture du backend */}
                {property.host.picture ? (
                  <Image
                    src={property.host.picture}
                    alt={property.host.name}
                    width={80}
                    height={80}
                    className="size-20 rounded-[10px] object-cover"
                  />
                ) : (
                  <p className="flex size-20 items-center justify-center rounded-[10px] bg-gris-light px-2 text-center text-xs text-gris-dark">
                    Photo indisponible
                  </p>
                )}
                <p className="text-base">{property.host.name}</p>
                <p className="ml-auto flex h-10 items-center gap-2 rounded-[10px] bg-gris-light px-3 text-base">
                  <Image
                    src="/img/icones/logement/etoile.svg"
                    alt=""
                    width={15}
                    height={16}
                  />
                  {property.ratingAverage}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <Link
                  href={ROUTES.contactHost(property.id)}
                  prefetch={false}
                  className="flex h-9 items-center justify-center rounded-[10px] bg-main-red text-sm text-blanc"
                >
                  Contacter l’hôte
                </Link>
                <Link
                  href={ROUTES.contactHost(property.id)}
                  prefetch={false}
                  className="flex h-9 items-center justify-center rounded-[10px] bg-main-red text-sm text-blanc"
                >
                  Envoyer un message
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
