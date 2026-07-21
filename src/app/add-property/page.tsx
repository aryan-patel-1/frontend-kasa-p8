import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { dataProvider } from "@/data/data-provider";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Ajouter une propriété",
  description: "Préparez les informations d'un nouveau logement Kasa.",
};

const fieldClass =
  "mt-2 h-10 w-full rounded border border-gris-light bg-blanc px-3 text-xs outline-none placeholder:text-gris-dark focus:border-main-red focus:ring-1 focus:ring-main-red";

type ImageFieldProps = Readonly<{
  id: string;
  label: string;
}>;

function ImageField({ id, label }: ImageFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 flex gap-2">
        <div className="h-10 flex-1 rounded border border-gris-light bg-blanc" />
        <label
          htmlFor={id}
          aria-label={`Choisir ${label.toLowerCase()}`}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-main-red focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-main-red"
        >
          <Image
            src="/img/icones/actions/ajouter.svg"
            alt=""
            width={13}
            height={13}
          />
          {/* Cache le champ natif derrière le bouton personnalisé */}
          <input
            id={id}
            name={id}
            type="file"
            accept="image/*"
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
}

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
          Retour aux annonces
        </Link>

        <div className="mt-7 flex items-center justify-between lg:mt-10">
          <h1 className="text-xl font-medium leading-[1.426] lg:text-2xl">
            Ajouter une propriété
          </h1>
          <button
            type="button"
            className="h-9 rounded-[10px] bg-main-red px-6 text-sm text-blanc"
          >
            Ajouter
          </button>
        </div>

        {/* Réorganise les blocs en deux colonnes sur desktop */}
        <form className="mt-4 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-2 lg:items-start">
          <section className="rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-[544px] lg:px-20 lg:py-20">
            <div>
              <label htmlFor="property-title" className="text-sm font-medium">
                Titre de la propriété
              </label>
              <input
                id="property-title"
                name="title"
                type="text"
                placeholder="Ex : Appartement cosy au coeur de paris"
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Décrivez votre propriété en détail..."
                className="mt-2 h-[120px] w-full resize-y rounded border border-gris-light bg-blanc p-3 text-xs outline-none placeholder:text-gris-dark focus:border-main-red focus:ring-1 focus:ring-main-red"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="postal-code" className="text-sm font-medium">
                Code postal
              </label>
              <input
                id="postal-code"
                name="postalCode"
                inputMode="numeric"
                className={fieldClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="location" className="text-sm font-medium">
                Localisation
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className={fieldClass}
              />
            </div>
          </section>

          <section className="space-y-4 rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-2 lg:row-start-1 lg:min-h-[264px] lg:px-20 lg:py-12">
            <ImageField id="cover-image" label="Image de couverture" />
            <ImageField id="property-image" label="Image du logement" />
            <button type="button" className="text-sm text-main-red">
              +Ajouter une image
            </button>
          </section>

          <section className="space-y-4 rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-2 lg:row-start-2 lg:min-h-[264px] lg:px-20 lg:py-12">
            <div>
              <label htmlFor="host-name" className="text-sm font-medium">
                Nom de l’hôte
              </label>
              <input
                id="host-name"
                name="hostName"
                type="text"
                className={fieldClass}
              />
            </div>
            <ImageField id="host-picture" label="Photo de profil" />
            <button type="button" className="text-sm text-main-red">
              +Ajouter une image
            </button>
          </section>

          <section className="rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-1 lg:row-start-3 lg:min-h-[584px] lg:px-20 lg:py-20">
            <h2 className="text-sm font-medium">Équipements</h2>
            <fieldset className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4">
              <legend className="sr-only">Choisir les équipements</legend>
              {equipments.map((equipment) => (
                <label
                  key={equipment}
                  className="flex items-center gap-3 text-xs text-gris-dark"
                >
                  <input
                    type="checkbox"
                    name="equipments"
                    value={equipment}
                    className="size-3 accent-main-red"
                  />
                  {equipment}
                </label>
              ))}
            </fieldset>
          </section>

          <section className="rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-2 lg:row-start-3 lg:min-h-[444px] lg:px-20 lg:py-20">
            <h2 className="text-sm font-medium">Catégories</h2>
            <div className="mt-5 flex flex-wrap gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="h-8 rounded bg-gris-light px-4 text-xs text-gris-dark"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-5">
              <label htmlFor="custom-category" className="text-sm font-medium">
                Ajouter une catégorie personnalisée
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="custom-category"
                  name="customCategory"
                  type="text"
                  placeholder="Nouveau tag"
                  className="h-10 flex-1 rounded border border-gris-light px-3 text-xs outline-none placeholder:text-gris-dark focus:border-main-red focus:ring-1 focus:ring-main-red"
                />
                <button
                  type="button"
                  aria-label="Ajouter la catégorie"
                  className="flex size-10 shrink-0 items-center justify-center rounded-md bg-main-red"
                >
                  <Image
                    src="/img/icones/actions/ajouter.svg"
                    alt=""
                    width={13}
                    height={13}
                  />
                </button>
              </div>
              <button type="button" className="mt-2 text-sm text-main-red">
                +Ajouter un tag
              </button>
            </div>
          </section>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}
