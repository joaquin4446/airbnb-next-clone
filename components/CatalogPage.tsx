"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListingGrid } from "@/components/ListingGrid";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { ResultsHeader } from "@/components/ResultsHeader";
import { SortControl, type SortOrder } from "@/components/SortControl";
import { demoListings } from "@/lib/listings";

const CatalogPage = () => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("price-asc");
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());

  const sortedListings = useMemo(() => [...demoListings].sort((first, second) => {
    const difference = first.pricePerNight - second.pricePerNight;
    return sortOrder === "price-asc" ? difference : -difference;
  }), [sortOrder]);

  const toggleFavorite = (listingId: string) => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(listingId)) next.delete(listingId);
      else next.add(listingId);
      return next;
    });
  };

  const clearFilters = () => undefined;

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="border-b border-neutral-100 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-10 lg:px-20">
          <Link href="/" aria-label="Volver al inicio" className="flex min-h-11 items-center gap-2 text-[#ff385c]">
            <span aria-hidden="true" className="text-2xl font-semibold">‹</span>
            <span className="text-sm font-semibold text-neutral-800 sm:text-base">Volver al inicio</span>
          </Link>
          <Link href="/catalog" aria-label="Catálogo de alojamientos" className="text-sm font-semibold text-neutral-700 hover:text-neutral-900">
            Catálogo
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 pb-12 pt-6 sm:px-10 sm:pt-8 lg:px-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <ResultsHeader resultCount={sortedListings.length} />
          <SortControl value={sortOrder} onChange={setSortOrder} />
        </div>
        <section aria-label="Resultados de alojamientos" className="mt-6">
          <ListingGrid
            listings={sortedListings}
            isLoading={false}
            onClearFilters={clearFilters}
            favoriteIds={favoriteIds}
            onFavoriteToggle={toggleFavorite}
          />
        </section>
        <div className="mt-10 sm:mt-12">
          <MapPlaceholder />
        </div>
      </div>
    </main>
  );
};

export default CatalogPage;
