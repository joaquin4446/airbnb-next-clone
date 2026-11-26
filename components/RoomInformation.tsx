import { RatingStars } from "@/components/RatingStars";
import type { Listing } from "@/types/listing";

interface RoomInformationProps {
  listing: Listing;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export const RoomInformation = ({ listing, bedrooms, beds, bathrooms }: RoomInformationProps) => (
  <section className="border-b border-neutral-200 py-6">
    <h1 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-3xl">{listing.title}</h1>
    <p className="mt-2 text-sm text-neutral-600">{listing.location}</p>
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <RatingStars rating={listing.rating} reviewCount={listing.reviewCount} />
      <span className="text-neutral-500">·</span>
      <span className="text-neutral-600">{bedrooms} dormitorios · {beds} camas · {bathrooms} baños</span>
    </div>
  </section>
);
