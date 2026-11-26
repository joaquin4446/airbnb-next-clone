export const RoomLoadingState = () => (
  <div aria-busy="true" className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8">
    <div className="aspect-4/3 animate-pulse rounded-2xl bg-neutral-200 md:aspect-2/1" />
    <div className="mt-6 h-7 w-3/4 animate-pulse rounded bg-neutral-200" />
    <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-neutral-100" />
    <p role="status" className="sr-only">Cargando alojamiento…</p>
  </div>
);
