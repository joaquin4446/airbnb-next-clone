"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryFilter, type CategoryOption } from "@/components/CategoryFilter";
import { ListingGrid } from "@/components/ListingGrid";
import { SiteHeader } from "@/components/SiteHeader";
import { demoListings } from "@/lib/listings";
import type { Listing } from "@/types/listing";

const categories: CategoryOption[] = [
  { id: "all", label: "Todas", icon: "all" },
  { id: "trending", label: "Tendencias", icon: "trending" },
  { id: "beach", label: "Playa", icon: "beach" },
  { id: "cabins", label: "Cabañas", icon: "cabins" },
  { id: "mansions", label: "Mansiones", icon: "mansions" },
  { id: "design", label: "Diseño", icon: "design" },
  { id: "pools", label: "Piscinas increíbles", icon: "pools" },
];

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");

const HomePage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryOption["id"]>("all");
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setListings(demoListings);
      setIsLoading(false);
    }, 700);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredListings = useMemo(() => {
    const search = normalize(query.trim());
    return listings.filter((listing) => {
      const categoryLabel = categories.find((category) => category.id === listing.category)?.label ?? "";
      const matchesQuery = !search || normalize(`${listing.title} ${listing.location} ${categoryLabel}`).includes(search);
      const matchesCategory = activeCategory === "all" || listing.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, listings, query]);

  const toggleFavorite = (listingId: string) => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(listingId)) next.delete(listingId);
      else next.add(listingId);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("all");
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <SiteHeader query={query} onQueryChange={setQuery} />
      <section aria-label="Categorías de alojamientos" className="sticky top-0 z-10 bg-white/95 pt-3 backdrop-blur-sm sm:pt-5">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </section>
      <section aria-label="Alojamientos disponibles" className="mx-auto max-w-[1600px] px-5 pb-12 pt-5 sm:px-10 sm:pt-7 lg:px-20">
        {!isLoading && (
          <p className="sr-only" role="status" aria-live="polite">
            {filteredListings.length} alojamientos encontrados
          </p>
        )}
        <ListingGrid
          listings={filteredListings}
          isLoading={isLoading}
          onClearFilters={clearFilters}
          favoriteIds={favoriteIds}
          onFavoriteToggle={toggleFavorite}
        />
      </section>
    </main>
  );
};

export default HomePage;
