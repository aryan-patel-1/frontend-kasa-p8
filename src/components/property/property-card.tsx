import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Property } from "@/types/property";

type PropertyCardProps = Readonly<{
  property: Property;
  isFavorite?: boolean;
}>;

export function PropertyCard({
  property,
  isFavorite = false,
}: PropertyCardProps) {
  // Rend toute la carte accessible avec un seul lien
  return (
    <Link
      href={ROUTES.property(property.id)}
      aria-label={`Voir le logement ${property.title}`}
      className="block w-full max-w-[355px] rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-red"
    >
      <article className="overflow-hidden rounded-[10px] bg-blanc">
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
          <span
            className={`group absolute right-4 top-4 flex size-8 items-center justify-center rounded transition-colors duration-200 ${
              isFavorite ? "bg-main-red" : "bg-blanc hover:bg-main-red"
            }`}
          >
            {isFavorite ? (
              <Image
                src="/img/icones/logement/favori-actif.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
            ) : (
              <>
                {/* Superpose les icônes pour animer le cœur sans état React */}
                <Image
                  src="/img/icones/logement/favori.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 transition-opacity duration-200 group-hover:opacity-0"
                />
                <Image
                  src="/img/icones/logement/favori-actif.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="absolute size-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </>
            )}
          </span>
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
      </article>
    </Link>
  );
}
