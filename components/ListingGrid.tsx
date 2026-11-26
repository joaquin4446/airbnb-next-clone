import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/ListingCard";
import { LoadingState } from "@/components/LoadingState";
import type { Listing } from "@/types/listing";

interface ListingGridProps {
  listings: Listing[];
  isLoading: boolean;
  onClearFilters: () => void;
  favoriteIds: Set<string>;
  onFavoriteToggle: (listingId: string) => void;
}

export const ListingGrid = ({
  listings,
  isLoading,
  onClearFilters,
  favoriteIds,
  onFavoriteToggle,
}: ListingGridProps) => {
  if (isLoading) return <LoadingState />;
  if (!listings.length) return <EmptyState onClearFilters={onClearFilters} />;

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3 2xl:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          isFavorite={favoriteIds.has(listing.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};
