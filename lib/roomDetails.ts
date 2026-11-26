import { demoListings } from "@/lib/listings";
import type { Amenity, RoomContent, RoomDetail, RoomPhoto } from "@/types/room";

const roomContent: Record<string, RoomContent> = {
  "casa-mar-cadiz": {
    photos: [
      { src: "/listings/coast.svg", alt: "Casa blanca junto a la costa y el mar azul" },
      { src: "/listings/island.svg", alt: "Terraza luminosa con vistas al mar" },
      { src: "/listings/villa.svg", alt: "Zona exterior soleada del alojamiento" },
    ],
    host: { name: "Lucía", joinedLabel: "Anfitriona desde 2019", isSuperhost: true },
    description: "Disfruta de una estancia tranquila junto al Atlántico, con espacios luminosos y todo lo necesario para explorar la costa de Cádiz.",
    amenities: [
      { id: "wifi", label: "Wifi", icon: "wifi" },
      { id: "kitchen", label: "Cocina equipada", icon: "kitchen" },
      { id: "parking", label: "Aparcamiento gratuito", icon: "parking" },
      { id: "beach", label: "Acceso a la playa", icon: "beach" },
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    estimatedNights: 3,
  },
};

const makeAmenity = (amenity: Amenity): Amenity => amenity;
const makePhotos = (cover: string, alt: string): RoomPhoto[] => [
  { src: cover, alt },
  { src: "/listings/loft.svg", alt: "Interior acogedor del alojamiento" },
  { src: "/listings/cabin.svg", alt: "Espacio exterior rodeado de naturaleza" },
];

export const getRoomDetail = (id: string): RoomDetail | null => {
  const listing = demoListings.find((item) => item.id === id);
  if (!listing) return null;

  const content = roomContent[id] ?? {
    photos: makePhotos(listing.imageUrl, listing.imageAlt),
    host: { name: "Alex", joinedLabel: "Anfitrión desde 2021", isSuperhost: false },
    description: `Alójate en ${listing.title}, en ${listing.location}. Un espacio de demostración cómodo para disfrutar de una escapada y conocer el entorno.`,
    amenities: [
      makeAmenity({ id: "wifi", label: "Wifi", icon: "wifi" }),
      makeAmenity({ id: "kitchen", label: "Cocina equipada", icon: "kitchen" }),
      makeAmenity({ id: "workspace", label: "Espacio de trabajo", icon: "workspace" }),
      makeAmenity({ id: "heating", label: "Calefacción", icon: "heating" }),
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    estimatedNights: 3,
  } satisfies RoomContent;

  return { listing, ...content };
};
