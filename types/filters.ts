export type FilterControlType = "text" | "select" | "multi-select";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: FilterControlType;
  placeholder?: string;
  options?: FilterOption[];
}

export interface FilterSection {
  id: string;
  title: string;
  description?: string;
  filters: FilterConfig[];
}
