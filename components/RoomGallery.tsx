"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { RoomPhoto } from "@/types/room";

interface RoomGalleryProps {
  images: RoomPhoto[];
  title: string;
}

export const RoomGallery = ({ images, title }: RoomGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  if (images.length === 0) return <div className="aspect-4/3 rounded-2xl bg-neutral-100" aria-label="Sin fotografías" />;

  const move = (direction: -1 | 1) => {
    setActiveIndex((index) => (index + direction + images.length) % images.length);
  };

  return (
    <section aria-label="Galería de fotografías" className="min-w-0">
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-neutral-100 md:aspect-2/1">
        <Image src={images[activeIndex].src} alt={images[activeIndex].alt} fill priority sizes="(max-width: 767px) calc(100vw - 40px), 1200px" className="object-cover" />
        <button type="button" aria-label="Foto anterior" onClick={() => move(-1)} className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">
          <Icon name="chevron-left" className="size-5" />
        </button>
        <button type="button" aria-label="Foto siguiente" onClick={() => move(1)} className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-neutral-800 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">
          <Icon name="chevron-right" className="size-5" />
        </button>
        <span aria-live="polite" className="absolute bottom-3 right-3 rounded-full bg-neutral-900/75 px-3 py-1 text-xs font-medium text-white">{activeIndex + 1} / {images.length}</span>
      </div>
      <p className="sr-only">Galería de {title}</p>
    </section>
  );
};
