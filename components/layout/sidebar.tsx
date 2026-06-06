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
  Rocket,
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
      className="hidden border-r md:sticky md:top-0 md:flex md:h-screen md:self-start md:flex-col md:overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex h-full w-full flex-col">
        <section
          aria-label="Logo section"
          className={cn(
            "space-y-3 px-3 pb-4 pt-3",
            !collapsed && "px-4 lg:px-6",
          )}
        >
          <div
            aria-hidden="true"
            className={cn(
              "flex h-10 items-center",
              collapsed ? "justify-center" : "justify-start",
            )}
          >
            <span className="text-xl font-medium">Bitscale</span>
          </div>
        </section>

        <SidebarDivider />

        <section
          aria-label="Workspace section"
          className={cn("space-y-3 px-3 py-4", !collapsed && "px-4 lg:px-6")}
        >
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border"
            >
              <span className="text-xs">GS</span>
            </div>
            <div className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
              <button
                type="button"
                aria-label="Select workspace"
                className="flex w-full items-center justify-between gap-2 text-left text-sm"
              >
                <span className="truncate">GTM Spaces</span>
                <ChevronDown aria-hidden="true" size={14} />
              </button>
            </div>
          </div>
        </section>

        <SidebarDivider />

        <nav
          aria-label="Primary navigation"
          className={cn("px-3 py-4", !collapsed && "px-4 lg:px-6")}
        >
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
            <SidebarNavLink href="/settings" label="Settings" icon="settings" collapsed={collapsed} />
          </SidebarGroup>
        </nav>

        <div aria-hidden="true" className="flex-1" />

        <SidebarDivider />

        <section
          aria-label="Support section"
          className={cn("px-3 pb-3 pt-4", !collapsed && "px-4 lg:px-6")}
        >
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

function SidebarDivider() {
  return <div aria-hidden="true" className="border-b" />;
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
    disabled?: boolean;
    trailingIcon?: "arrow-right" | "upgrade";
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
        disabled={item.disabled}
        trailingIcon={item.trailingIcon}
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
  disabled,
  trailingIcon,
}: {
  href: string;
  label: string;
  icon: NavigationIcon | "documentation";
  collapsed: boolean;
  active?: boolean;
  disabled?: boolean;
  trailingIcon?: "arrow-right" | "upgrade";
}) {
  const Icon = sidebarIcons[icon];

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled ? "true" : undefined}
      className={cn(
        "flex items-center gap-3 rounded px-3 py-2 text-sm",
        active ? "font-medium" : "font-normal",
        collapsed && "justify-center px-2",
        disabled && "opacity-60",
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-6 w-6 items-center justify-center rounded border text-xs"
      >
        <Icon size={14} />
      </span>
      <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
      {trailingIcon ? (
        <span className={cn("ml-auto inline-flex items-center", collapsed && "sr-only")}>
          {trailingIcon === "arrow-right" ? (
            <ChevronRight aria-hidden="true" size={14} />
          ) : (
            <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-full border">
              <Rocket size={12} />
            </span>
          )}
        </span>
      ) : null}
    </Link>
  );
}

const sidebarIcons: Record<NavigationIcon | "documentation", typeof LayoutDashboard> = {
  dashboard: LayoutDashboard,
  playbooks: LibraryBig,
  integrations: BriefcaseBusiness,
  people: Users,
  projects: BriefcaseBusiness,
  reports: LibraryBig,
  billing: FolderOpen,
  support: LifeBuoy,
  settings: Settings,
  documentation: BookOpenText,
};
