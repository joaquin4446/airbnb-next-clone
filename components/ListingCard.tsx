import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RatingStars } from "@/components/RatingStars";
import type { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
  isFavorite?: boolean;
  onFavoriteToggle?: (listingId: string) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);

export const ListingCard = ({
  listing,
  isFavorite = false,
  onFavoriteToggle,
}: ListingCardProps) => (
  <article className="min-w-0">
    <div className="relative aspect-[1.04/1] overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[1.12/1]">
      <Link
        href={`/rooms/${listing.id}`}
        aria-label={`Ver alojamiento: ${listing.title}`}
        className="absolute inset-0"
      >
        <Image
          src={listing.imageUrl}
          alt={listing.imageAlt}
          fill
          sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 45vw, 340px"
          className="object-cover transition duration-500 hover:scale-[1.03]"
          loading={listing.id === "casa-mar-cadiz" ? "eager" : "lazy"}
          priority={listing.id === "casa-mar-cadiz"}
        />
      </Link>
      <button
        type="button"
        aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        aria-pressed={isFavorite}
        onClick={() => onFavoriteToggle?.(listing.id)}
        className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
      >
        <Icon
          name="heart"
          filled={isFavorite}
          className={`size-5 ${isFavorite ? "text-[#ff385c]" : "text-neutral-700"}`}
        />
      </button>
    </div>
    <div className="mt-3 flex items-start justify-between gap-2">
      <Link href={`/rooms/${listing.id}`} className="min-w-0 flex-1 rounded-sm focus-visible:outline-2 focus-visible:outline-rose-500">
        <h2 className="truncate text-[14px] font-semibold leading-5 text-neutral-900">{listing.title}</h2>
        <p className="mt-0.5 truncate text-[14px] leading-5 text-neutral-500">{listing.location}</p>
      </Link>
      <RatingStars rating={listing.rating} />
    </div>
    <p className="mt-2 text-[14px] text-neutral-800">
      <span className="font-semibold underline decoration-neutral-400 underline-offset-2">{formatPrice(listing.pricePerNight)}</span>
      <span className="text-neutral-600"> noche</span>
    </p>
  </article>
);
