export type IconName =
  | "search"
  | "menu"
  | "user"
  | "heart"
  | "star"
  | "all"
  | "beach"
  | "cabins"
  | "mansions"
  | "trending"
  | "design"
  | "pools"
  | "close";

interface IconProps {
  name: IconName;
  className?: string;
  filled?: boolean;
}

const paths: Record<IconName, string> = {
  search: "M21 21l-4.35-4.35M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  user: "M20 21a8 8 0 0 0-16 0m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z",
  star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z",
  all: "M3 10.5 12 3l9 7.5M5 9v11h14V9M9 20v-6h6v6",
  beach: "M12 3v18m0-18a6 6 0 0 0-6 6h6m0-6a6 6 0 0 1 6 6h-6M4 15h16M6 19h12",
  cabins: "m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6",
  mansions: "M3 20V8l9-5 9 5v12M3 12h18M8 12v8m8-8v8M9 8h.01M15 8h.01",
  trending: "M3 17 9 11l4 4 8-9m-6 0h6v6",
  design: "M12 3v18m-9-9h18M5.6 5.6l12.8 12.8m0-12.8L5.6 18.4",
  pools: "M3 17c2.2 0 2.2 2 4.5 2s2.3-2 4.5-2 2.3 2 4.5 2 2.3-2 4.5-2M7 14V5h10v9M7 9h10",
  close: "m18 6-12 12M6 6l12 12",
};

export const Icon = ({ name, className, filled = false }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={paths[name]} />
  </svg>
);
