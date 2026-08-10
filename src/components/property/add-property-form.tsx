"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { ROUTES } from "@/lib/routes";

const fieldClass =
  "mt-2 h-10 w-full rounded border border-gris-light bg-blanc px-3 text-xs outline-none placeholder:text-gris-dark focus:border-main-red focus:ring-1 focus:ring-main-red";

type AddPropertyFormProps = Readonly<{
  equipments: string[];
  categories: string[];
}>;

type ImageFieldProps = Readonly<{
  id: string;
  label: string;
  name: string;
  multiple?: boolean;
  required?: boolean;
  selectedFiles: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}>;

function ImageField({
  id,
  label,
  name,
  multiple = false,
  required = false,
  selectedFiles,
  onChange,
}: ImageFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 flex gap-2">
        <p className="flex h-10 min-w-0 flex-1 items-center truncate rounded border border-gris-light bg-blanc px-3 text-xs text-gris-dark">
          {selectedFiles || "Aucun fichier sélectionné"}
        </p>
        <label
          htmlFor={id}
          aria-label={`Choisir ${label.toLowerCase()}`}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-main-red text-2xl font-light leading-none text-blanc focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-main-red"
        >
          <span aria-hidden="true">+</span>
          <input
            id={id}
            name={name}
            type="file"
            accept="image/*"
            multiple={multiple}
            required={required}
            onChange={onChange}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
}

export function AddPropertyForm({
  equipments,
  categories,
}: AddPropertyFormProps) {
  const router = useRouter();
  const [coverName, setCoverName] = useState("");
  const [galleryNames, setGalleryNames] = useState("");
  const [hostPictureName, setHostPictureName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customCategory, setCustomCategory] = useState("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const displayedCategories = [...categories, ...customCategories];

  function toggleCategory(category: string) {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((item) => item !== category)
        : [...currentCategories, category],
    );
  }

  function addCustomCategory() {
    const newCategory = customCategory.trim();

    if (!newCategory) {
      return;
    }

    if (!displayedCategories.includes(newCategory)) {
      setCustomCategories((currentCategories) => [
        ...currentCategories,
        newCategory,
      ]);
    }

    setSelectedCategories((currentCategories) =>
      currentCategories.includes(newCategory)
        ? currentCategories
        : [...currentCategories, newCategory],
    );
    setCustomCategory("");
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const result = (await response.json()) as {
        id?: string;
        error?: string;
      };

      if (!response.ok || !result.id) {
        setErrorMessage(result.error ?? "La création du logement a échoué");
        return;
      }

      // Ouvre directement l’annonce créée pour vérifier le résultat
      router.push(ROUTES.property(result.id));
      router.refresh();
    } catch {
      setErrorMessage("Le serveur est momentanément indisponible");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-7 flex items-center justify-between lg:mt-10">
        <h1 className="text-xl font-medium leading-[1.426] lg:text-2xl">
          Ajouter une propriété
        </h1>
        <button
          type="submit"
          disabled={isLoading}
          className="h-9 rounded-[10px] bg-main-red px-6 text-sm text-blanc transition-[background-color] hover:bg-dark-orange disabled:cursor-wait disabled:opacity-60"
        >
          {isLoading ? "Ajout en cours…" : "Ajouter"}
        </button>
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className="mt-4 rounded border border-main-red bg-blanc p-3 text-sm text-main-red"
        >
          {errorMessage}
        </p>
      ) : null}

      {/* Réorganise les blocs en deux colonnes sur desktop */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:mt-10 lg:grid-cols-2 lg:items-start">
        <section className="rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-[544px] lg:px-20 lg:py-20">
          <div>
            <label htmlFor="property-title" className="text-sm font-medium">
              Titre de la propriété
            </label>
            <input
              id="property-title"
              name="title"
              type="text"
              required
              disabled={isLoading}
              placeholder="Ex : Appartement cosy au cœur de Paris"
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
              required
              disabled={isLoading}
              placeholder="Décrivez votre propriété en détail..."
              className="mt-2 h-[120px] w-full resize-y rounded border border-gris-light bg-blanc p-3 text-xs outline-none placeholder:text-gris-dark focus:border-main-red focus:ring-1 focus:ring-main-red"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="postal-code" className="text-sm font-medium">
                Code postal
              </label>
              <input
                id="postal-code"
                name="postalCode"
                inputMode="numeric"
                disabled={isLoading}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="location" className="text-sm font-medium">
                Localisation
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                disabled={isLoading}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="price-per-night" className="text-sm font-medium">
              Prix par nuit
            </label>
            <input
              id="price-per-night"
              name="pricePerNight"
              type="number"
              min="1"
              step="1"
              required
              disabled={isLoading}
              className={fieldClass}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-2 lg:row-start-1 lg:min-h-[264px] lg:px-20 lg:py-12">
          <ImageField
            id="cover-image"
            name="coverImage"
            label="Image de couverture"
            required
            selectedFiles={coverName}
            onChange={(event) =>
              setCoverName(event.currentTarget.files?.[0]?.name ?? "")
            }
          />
          <ImageField
            id="property-images"
            name="propertyImages"
            label="Image du logement"
            multiple
            selectedFiles={galleryNames}
            onChange={(event) =>
              setGalleryNames(
                Array.from(event.currentTarget.files ?? [])
                  .map((file) => file.name)
                  .join(", "),
              )
            }
          />
          <label
            htmlFor="property-images"
            className="inline-block cursor-pointer text-sm text-main-red"
          >
            +Ajouter une image
          </label>

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
              required
              disabled={isLoading}
              className={fieldClass}
            />
          </div>
          <ImageField
            id="host-picture"
            name="hostPicture"
            label="Photo de profil"
            selectedFiles={hostPictureName}
            onChange={(event) =>
              setHostPictureName(event.currentTarget.files?.[0]?.name ?? "")
            }
          />
          <label
            htmlFor="host-picture"
            className="inline-block cursor-pointer text-sm text-main-red"
          >
            +Ajouter une image
          </label>
        </section>

        <section className="rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-1 lg:row-start-3 lg:min-h-[584px] lg:px-20 lg:py-16">
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
                  disabled={isLoading}
                  className="size-3 accent-main-red"
                />
                {equipment}
              </label>
            ))}
          </fieldset>
        </section>

        <section className="rounded-[10px] border border-gris-light bg-blanc p-4 lg:col-start-2 lg:row-start-3 lg:min-h-[444px] lg:px-20 lg:py-16">
          <fieldset>
            <legend className="text-sm font-medium">Catégories</legend>
            {selectedCategories.map((category) => (
              <input
                key={category}
                type="hidden"
                name="categories"
                value={category}
              />
            ))}
            <div className="mt-5 flex flex-wrap gap-2">
              {displayedCategories.map((category) => {
                const isSelected = selectedCategories.includes(category);

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isSelected}
                    disabled={isLoading}
                    onClick={() => toggleCategory(category)}
                    className={`h-8 rounded px-4 text-xs transition-[color,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red ${
                      isSelected
                        ? "bg-main-red text-blanc"
                        : "bg-gris-light text-gris-dark"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8">
            <label htmlFor="custom-category" className="text-sm font-medium">
              Ajouter une catégorie personnalisée
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="custom-category"
                type="text"
                value={customCategory}
                disabled={isLoading}
                onChange={(event) => setCustomCategory(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCustomCategory();
                  }
                }}
                placeholder="Nouveau tag"
                className="h-10 min-w-0 flex-1 rounded border border-gris-light bg-blanc px-3 text-xs outline-none placeholder:text-gris-dark focus:border-main-red focus:ring-1 focus:ring-main-red"
              />
              <button
                type="button"
                aria-label="Ajouter la catégorie personnalisée"
                disabled={isLoading}
                onClick={addCustomCategory}
                className="flex size-10 shrink-0 items-center justify-center rounded-md bg-main-red text-2xl font-light leading-none text-blanc focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
            <button
              type="button"
              disabled={isLoading}
              onClick={addCustomCategory}
              className="mt-2 text-sm text-main-red"
            >
              +Ajouter un tag
            </button>
          </div>
        </section>
      </div>
    </form>
  );
}
