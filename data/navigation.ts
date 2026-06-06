import type { NavigationItem } from "@/types/navigation";

export const primaryNavigation: NavigationItem[] = [
  {
    id: "dashboard",
    label: "My Dashboard",
    href: "/",
    icon: "dashboard",
    isActive: true,
    trailingIcon: "arrow-right",
  },
  {
    id: "playbooks",
    label: "Playbooks",
    href: "/subscription",
    icon: "playbooks",
    disabled: true,
    trailingIcon: "upgrade",
  },
  {
    id: "integrations",
    label: "Integrations",
    href: "/integrations",
    icon: "integrations",
  },
];

export const supportNavigation: NavigationItem[] = [
  {
    id: "help",
    label: "Help center",
    href: "/help",
    icon: "support",
  },
  {
    id: "settings",
    label: "Workspace settings",
    href: "/settings",
    icon: "settings",
  },
];
