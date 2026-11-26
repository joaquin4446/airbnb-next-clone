interface ResultsHeaderProps {
  resultCount: number;
}

export const ResultsHeader = ({ resultCount }: ResultsHeaderProps) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-neutral-600">Alojamientos disponibles</p>
    <p className="text-sm text-neutral-500" aria-live="polite">
      {resultCount} {resultCount === 1 ? "alojamiento" : "alojamientos"}
    </p>
  </div>
);
