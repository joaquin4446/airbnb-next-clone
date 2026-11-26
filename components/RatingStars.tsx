import { Icon } from "@/components/Icon";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
}

export const RatingStars = ({ rating, reviewCount }: RatingStarsProps) => (
  <span
    aria-label={`Valoración ${rating.toFixed(2)} de 5${
      reviewCount === undefined ? "" : `, ${reviewCount} reseñas`
    }`}
    className="inline-flex items-center gap-1 text-sm text-neutral-800"
  >
    <Icon name="star" filled className="size-3.5" />
    <span>{rating.toFixed(2)}</span>
    {reviewCount !== undefined && (
      <span className="text-neutral-500">({reviewCount})</span>
    )}
  </span>
);
