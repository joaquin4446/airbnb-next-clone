"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SearchBar } from "@/components/SearchBar";

interface SiteHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export const SiteHeader = ({ query, onQueryChange }: SiteHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-neutral-100 bg-white">
      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-4 px-5 pb-4 pt-4 sm:px-10 sm:pb-5 sm:pt-5 lg:px-20">
        <div className="flex h-10 items-center justify-between">
          <Link href="/" aria-label="Airbnb, inicio" className="flex items-center gap-2 text-[#ff385c]">
            <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8 fill-current">
              <path d="M16 3.2c-2.3 0-4 2.7-5.7 6.2L4.1 22.2c-1.5 3.2.4 6.2 3.8 6.2 2.3 0 4.8-1.4 8.1-4.4 3.3 3 5.8 4.4 8.1 4.4 3.4 0 5.3-3 3.8-6.2L21.7 9.4C20 5.9 18.3 3.2 16 3.2Zm0 3.1c.8 0 2 2.1 3 4.2l5.9 12.4c.6 1.3.1 2.4-.9 2.4-1.3 0-3.4-1.3-6.1-3.8 1.9-2.1 2.8-3.9 2.8-5.4 0-2.7-1.9-4.7-4.7-4.7s-4.7 2-4.7 4.7c0 1.5.9 3.3 2.8 5.4-2.7 2.5-4.8 3.8-6.1 3.8-1 0-1.5-1.1-.9-2.4L13 10.5c1-2.1 2.2-4.2 3-4.2Zm0 8.2c1.1 0 1.8.7 1.8 1.7 0 .8-.6 2-1.8 3.4-1.2-1.4-1.8-2.6-1.8-3.4 0-1 .7-1.7 1.8-1.7Z" />
            </svg>
            <span className="hidden text-[22px] font-semibold tracking-[-1px] sm:block">airbnb</span>
          </Link>
          <p className="hidden text-sm font-medium text-neutral-700 md:block">
            Encuentra tu próximo lugar favorito
          </p>
          <Link
            href="/catalog"
            className="flex min-h-10 items-center rounded-full px-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          >
            Catálogo
          </Link>
          <div className="relative">
            <button
              type="button"
              aria-label="Abrir menú de usuario"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 items-center gap-3 rounded-full border border-neutral-300 bg-white py-1 pl-3 pr-1.5 text-neutral-700 shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
            >
              <Icon name="menu" className="size-4" />
              <span className="flex size-8 items-center justify-center rounded-full bg-neutral-500 text-white">
                <Icon name="user" className="size-4.5" />
              </span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="self-end rounded-xl border border-neutral-100 bg-white p-2 shadow-xl sm:absolute sm:right-10 sm:top-17 sm:z-20 sm:w-52 lg:right-20">
            <p className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-800">¡Hola, viajero!</p>
            <p className="px-3 pb-2 text-xs text-neutral-500">Explora alojamientos únicos.</p>
          </div>
        )}
        <SearchBar value={query} onChange={onQueryChange} />
      </div>
    </header>
  );
};
