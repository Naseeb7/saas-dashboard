import type { NavigationItem } from "@/types/navigation";

export const primaryNavigation: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: "dashboard",
    isActive: true,
  },
  {
    id: "people",
    label: "People",
    href: "/people",
    icon: "people",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
    icon: "projects",
  },
  {
    id: "reports",
    label: "Reports",
    href: "/reports",
    icon: "reports",
  },
  {
    id: "billing",
    label: "Billing",
    href: "/billing",
    icon: "billing",
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
