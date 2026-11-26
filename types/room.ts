import type { Listing } from "@/types/listing";

export interface RoomPhoto {
  src: string;
  alt: string;
}

export interface HostInfo {
  name: string;
  joinedLabel: string;
  isSuperhost: boolean;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;
}

export interface RoomContent {
  photos: RoomPhoto[];
  host: HostInfo;
  description: string;
  amenities: Amenity[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  estimatedNights: number;
}

export interface RoomDetail extends RoomContent {
  listing: Listing;
}
