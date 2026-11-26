import { Icon } from "@/components/Icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="flex h-14.5 w-full items-center gap-3 rounded-full border border-neutral-200 bg-white px-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] focus-within:ring-2 focus-within:ring-rose-500/30 sm:h-16 sm:px-5">
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ff385c] text-white sm:size-11">
      <Icon name="search" className="size-4.5" />
    </span>
    <span className="min-w-0 flex-1">
      <label htmlFor="listing-search" className="sr-only">Buscar alojamientos</label>
      <input
        id="listing-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="¿Adónde quieres ir?"
        className="w-full appearance-none border-0 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-500 sm:text-base"
      />
      <span className="mt-0.5 hidden text-xs text-neutral-500 sm:block">
        Busca por destino o alojamiento
      </span>
    </span>
    {value && (
      <button
        type="button"
        aria-label="Limpiar búsqueda"
        onClick={() => onChange("")}
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
      >
        <Icon name="close" className="size-4" />
      </button>
    )}
  </div>
);
