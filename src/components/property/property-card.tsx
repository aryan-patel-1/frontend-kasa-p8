import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/components/property/favorite-button";
import { ROUTES } from "@/lib/routes";
import type { Property } from "@/types/property";

type PropertyCardProps = Readonly<{
  property: Property;
  isFavorite?: boolean;
  canUpdateFavorite?: boolean;
  refreshAfterFavoriteUpdate?: boolean;
}>;

export function PropertyCard({
  property,
  isFavorite = false,
  canUpdateFavorite = false,
  refreshAfterFavoriteUpdate = false,
}: PropertyCardProps) {
  return (
    <article className="relative w-full max-w-[355px] overflow-hidden rounded-[10px] bg-blanc">
      <FavoriteButton
        propertyId={property.id}
        propertyTitle={property.title}
        initialIsFavorite={isFavorite}
        enabled={canUpdateFavorite}
        refreshAfterUpdate={refreshAfterFavoriteUpdate}
      />

      {/* Sépare le lien de navigation du bouton favori */}
      <Link
        href={ROUTES.property(property.id)}
        aria-label={`Voir le logement ${property.title}`}
        className="block rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-red"
      >
        <div className="relative aspect-[355/384] w-full overflow-hidden">
          {property.cover ? (
            <Image
              src={property.cover}
              alt={property.title}
              fill
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 355px"
              className="object-cover"
            />
          ) : (
            <p className="flex size-full items-center justify-center bg-gris-light text-sm text-gris-dark">
              Image indisponible
            </p>
          )}
        </div>

        <div className="flex min-h-[168px] flex-col p-6">
          <h2 className="text-base font-medium leading-[1.426]">
            {property.title}
          </h2>
          <p className="mt-1 text-xs leading-[1.426] text-gris-dark">
            {property.location}
          </p>
          <p className="mt-auto text-sm leading-[1.426]">
            <span className="font-medium">{property.pricePerNight}€</span>
            <span className="ml-2 text-xs text-gris-dark">par nuit</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
