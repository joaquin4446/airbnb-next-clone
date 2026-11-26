"use client";

import { useEffect, useState } from "react";
import { AmenitiesList } from "@/components/AmenitiesList";
import { BookingCard } from "@/components/BookingCard";
import { HostInformation } from "@/components/HostInformation";
import { RoomGallery } from "@/components/RoomGallery";
import { RoomInformation } from "@/components/RoomInformation";
import { RoomLoadingState } from "@/components/RoomLoadingState";
import { RoomNavigation } from "@/components/RoomNavigation";
import { RoomNotFound } from "@/components/RoomNotFound";
import { getRoomDetail } from "@/lib/roomDetails";
import type { RoomDetail } from "@/types/room";

interface RoomDetailPageProps {
  roomId: string;
}

export const RoomDetailPage = ({ roomId }: RoomDetailPageProps) => {
  const [result, setResult] = useState<{ roomId: string; room: RoomDetail | null } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setResult({ roomId, room: getRoomDetail(roomId) });
    }, 550);
    return () => window.clearTimeout(timer);
  }, [roomId]);

  const isLoading = result?.roomId !== roomId;
  const room = isLoading ? null : result.room;

  if (isLoading) return <><RoomNavigation /><RoomLoadingState /></>;
  if (!room) return <><RoomNavigation /><RoomNotFound roomId={roomId} /></>;

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <RoomNavigation />
      <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
        <h1 className="sr-only">Detalle de {room.listing.title}</h1>
        <div className="pt-5 sm:pt-7"><RoomGallery images={room.photos} title={room.listing.title} /></div>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_360px] md:gap-12">
          <div className="min-w-0">
            <RoomInformation listing={room.listing} bedrooms={room.bedrooms} beds={room.beds} bathrooms={room.bathrooms} />
            <HostInformation host={room.host} description={room.description} maxGuests={room.maxGuests} />
            <AmenitiesList amenities={room.amenities} />
          </div>
          <div className="min-w-0 py-6 md:sticky md:top-6 md:self-start">
            <BookingCard pricePerNight={room.listing.pricePerNight} maxGuests={room.maxGuests} estimatedNights={room.estimatedNights} />
          </div>
        </div>
      </div>
    </main>
  );
};
