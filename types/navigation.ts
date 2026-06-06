export type NavigationIcon =
  | "dashboard"
  | "playbooks"
  | "integrations"
  | "people"
  | "projects"
  | "reports"
  | "billing"
  | "support"
  | "settings";

export type NavigationTrailingIcon = "arrow-right" | "upgrade";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: NavigationIcon;
  isActive?: boolean;
  disabled?: boolean;
  trailingIcon?: NavigationTrailingIcon;
}
