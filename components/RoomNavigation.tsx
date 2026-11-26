import Link from "next/link";

export const RoomNavigation = () => (
  <header className="border-b border-neutral-100 bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
      <Link href="/" aria-label="Volver al inicio" className="flex size-11 items-center justify-center rounded-full text-2xl text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-rose-500">‹</Link>
      <Link href="/catalog" className="flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-rose-500">Volver al catálogo</Link>
    </div>
  </header>
);
