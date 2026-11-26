import { Icon, type IconName } from "@/components/Icon";
import type { ListingCategoryId } from "@/types/listing";

export interface CategoryOption {
  id: "all" | ListingCategoryId;
  label: string;
  icon: IconName;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  activeCategory: CategoryOption["id"];
  onCategoryChange: (category: CategoryOption["id"]) => void;
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) => (
  <nav aria-label="Filtrar por categoría" className="scrollbar-none overflow-x-auto">
    <div className="flex min-w-max gap-7 px-5 sm:gap-9 sm:px-10 lg:px-20">
      {categories.map((category) => {
        const active = category.id === activeCategory;
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={active}
            onClick={() => onCategoryChange(category.id)}
            className={`group flex min-w-[56px] flex-col items-center gap-2 border-b-2 pb-3 pt-1 text-[11px] font-medium transition sm:text-xs ${
              active
                ? "border-neutral-900 text-neutral-900"
                : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-800"
            }`}
          >
            <Icon
              name={category.icon}
              className={`size-6 transition group-hover:scale-105 ${active ? "text-neutral-900" : "text-neutral-500"}`}
            />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);
