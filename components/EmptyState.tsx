interface EmptyStateProps {
  onClearFilters: () => void;
}

export const EmptyState = ({ onClearFilters }: EmptyStateProps) => (
  <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
    <span className="text-4xl" aria-hidden="true">⌕</span>
    <h2 className="mt-4 text-lg font-semibold text-neutral-900">No encontramos alojamientos</h2>
    <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
      Prueba con otro destino o quita algún filtro para descubrir más lugares.
    </p>
    <button
      type="button"
      onClick={onClearFilters}
      className="mt-5 rounded-lg border border-neutral-900 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
    >
      Borrar filtros
    </button>
  </div>
);
