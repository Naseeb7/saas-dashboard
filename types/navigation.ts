export type NavigationIcon =
  | "dashboard"
  | "people"
  | "projects"
  | "reports"
  | "billing"
  | "support"
  | "settings";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: NavigationIcon;
  isActive?: boolean;
  badge?: string;
}
