interface GuestSelectorProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export const GuestSelector = ({ value, max, onChange }: GuestSelectorProps) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <p className="text-sm font-semibold text-neutral-900">Huéspedes</p>
      <p className="text-xs text-neutral-500">Máximo {max}</p>
    </div>
    <div className="flex items-center gap-3">
      <button type="button" aria-label="Reducir huéspedes" disabled={value <= 1} onClick={() => onChange(Math.max(1, value - 1))} className="size-11 rounded-full border border-neutral-300 text-lg text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">−</button>
      <output aria-live="polite" className="min-w-5 text-center text-sm font-medium">{value}</output>
      <button type="button" aria-label="Aumentar huéspedes" disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))} className="size-11 rounded-full border border-neutral-300 text-lg text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500">+</button>
    </div>
  </div>
);
