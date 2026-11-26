export type ListingCategoryId =
  | "beach"
  | "cabins"
  | "mansions"
  | "trending"
  | "design"
  | "pools";

export interface Listing {
  id: string;
  title: string;
  location: string;
  category: ListingCategoryId;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  imageAlt: string;
}
