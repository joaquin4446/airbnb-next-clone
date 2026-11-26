export type SortOrder = "price-asc" | "price-desc";

interface SortControlProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export const SortControl = ({ value, onChange }: SortControlProps) => (
  <label className="flex min-h-11 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-800 shadow-sm focus-within:ring-2 focus-within:ring-rose-500/30">
    <span className="shrink-0">Ordenar:</span>
    <select
      aria-label="Ordenar alojamientos por precio"
      value={value}
      onChange={(event) => onChange(event.target.value as SortOrder)}
      className="min-w-0 flex-1 cursor-pointer bg-transparent py-2 outline-none"
    >
      <option value="price-asc">Precio: menor a mayor</option>
      <option value="price-desc">Precio: mayor a menor</option>
    </select>
  </label>
);
