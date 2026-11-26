interface LoadingStateProps {
  count?: number;
}

export const LoadingState = ({ count = 4 }: LoadingStateProps) => (
  <div
    aria-label="Cargando alojamientos"
    aria-busy="true"
    className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 xl:grid-cols-3 2xl:grid-cols-4"
  >
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="animate-pulse">
        <div className="aspect-[1.04/1] rounded-2xl bg-neutral-200 sm:aspect-[1.12/1]" />
        <div className="mt-4 h-4 w-3/4 rounded bg-neutral-200" />
        <div className="mt-2 h-3 w-1/2 rounded bg-neutral-100" />
        <div className="mt-4 h-3 w-1/3 rounded bg-neutral-200" />
      </div>
    ))}
    <p className="sr-only">Cargando alojamientos…</p>
  </div>
);
