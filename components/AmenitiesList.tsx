import type { Amenity } from "@/types/room";

interface AmenitiesListProps {
  amenities: Amenity[];
}

export const AmenitiesList = ({ amenities }: AmenitiesListProps) => (
  <section className="border-b border-neutral-200 py-6">
    <h2 className="text-lg font-semibold text-neutral-900">Lo que ofrece este alojamiento</h2>
    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {amenities.map((amenity) => (
        <li key={amenity.id} className="flex min-h-11 items-center gap-3 text-sm text-neutral-700">
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700">{amenity.icon.slice(0, 1).toUpperCase()}</span>
          {amenity.label}
        </li>
      ))}
    </ul>
  </section>
);
