"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  BookOpenText,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  LifeBuoy,
  LayoutDashboard,
  LibraryBig,
  Settings,
  Users,
} from "lucide-react";

import { Button } from "@/components/shared/button";
import { primaryNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { NavigationIcon } from "@/types/navigation";

interface SidebarProps {
  collapsed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function Sidebar({ collapsed, onMouseEnter, onMouseLeave }: SidebarProps) {
  return (
    <aside
      aria-label="Sidebar navigation"
      className="hidden border-r md:flex md:flex-col"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={cn(
          "flex h-full min-h-screen w-full flex-col",
          collapsed ? "p-3" : "p-4 lg:p-6",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 border-b pb-4",
            collapsed && "justify-between",
          )}
        >
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded"
          >
            B
          </div>
          <div className={cn("min-w-0", collapsed && "sr-only")}>
            <p className="truncate text-sm font-medium">Bitscale</p>
            <button
              type="button"
              aria-label="Select workspace"
              className="mt-1 flex w-full items-center justify-between gap-2 text-left text-sm"
            >
              <span className="truncate">GTM Spaces</span>
              <ChevronDown aria-hidden="true" size={14} />
            </button>
          </div>
          <span aria-hidden="true" className="sr-only">
            {collapsed ? "Collapsed" : "Expanded"}
          </span>
        </div>

        <nav aria-label="Primary navigation" className="flex-1 py-4">
          <SidebarGroup title="Home" collapsed={collapsed}>
            {primaryNavigation.map((item) => (
              <SidebarNavItem key={item.id} item={item} collapsed={collapsed} />
            ))}
          </SidebarGroup>

          <SidebarGroup title="Other" collapsed={collapsed} className="mt-6">
            <SidebarNavLink
              href="/documentation"
              label="Documentation"
              icon="documentation"
              collapsed={collapsed}
            />
            <SidebarNavLink
              href="/settings"
              label="Settings"
              icon="settings"
              collapsed={collapsed}
            />
          </SidebarGroup>
        </nav>

        <section aria-label="Support section" className="mt-auto border-t pt-4">
          <div
            className={cn(
              "flex items-center gap-3 rounded border p-3",
              collapsed && "justify-center",
            )}
          >
            <div
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded border"
            >
              B
            </div>
            <div className={cn("min-w-0", collapsed && "sr-only")}>
              <p className="text-sm font-medium">Bitscale</p>
              <p className="text-xs">Get support at Bitscale</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn("ml-auto", collapsed && "sr-only")}
              aria-label="Open support details"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </section>
      </div>
    </aside>
  );
}

function SidebarGroup({
  title,
  children,
  collapsed,
  className,
}: {
  title: string;
  children: ReactNode;
  collapsed: boolean;
  className?: string;
}) {
  return (
    <section className={className}>
      <h2
        className={cn(
          "mb-3 px-3 text-xs font-medium uppercase tracking-wide",
          collapsed && "sr-only",
        )}
      >
        {title}
      </h2>
      <ul className="space-y-1">{children}</ul>
    </section>
  );
}

function SidebarNavItem({
  item,
  collapsed,
}: {
  item: {
    id: string;
    label: string;
    href: string;
    icon: NavigationIcon;
    isActive?: boolean;
    badge?: string;
  };
  collapsed: boolean;
}) {
  return (
    <li>
      <SidebarNavLink
        href={item.href}
        label={item.label}
        icon={item.icon}
        collapsed={collapsed}
        active={item.isActive}
        badge={item.badge}
      />
    </li>
  );
}

function SidebarNavLink({
  href,
  label,
  icon,
  collapsed,
  active,
  badge,
}: {
  href: string;
  label: string;
  icon: NavigationIcon | "documentation";
  collapsed: boolean;
  active?: boolean;
  badge?: string;
}) {
  const Icon = sidebarIcons[icon];

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded px-3 py-2 text-sm",
        active ? "font-medium" : "font-normal",
        collapsed && "justify-center px-2",
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-6 w-6 items-center justify-center rounded border text-xs"
      >
        <Icon size={14} />
      </span>
      <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
      {badge ? (
        <span className={cn("ml-auto text-xs", collapsed && "sr-only")}>
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

const sidebarIcons: Record<NavigationIcon | "documentation", typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  people: Users,
  projects: BriefcaseBusiness,
  reports: LibraryBig,
  billing: FolderOpen,
  support: LifeBuoy,
  settings: Settings,
  documentation: BookOpenText,
};
