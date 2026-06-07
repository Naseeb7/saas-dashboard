"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  BookOpenText,
  BriefcaseBusiness,
  ChevronRight,
  FolderOpen,
  LifeBuoy,
  LayoutDashboard,
  LibraryBig,
  Rocket,
  Settings,
  Users,
  ChevronsUpDown,
  Link as LinkIcon,
  ChevronUp,
  X,
} from "lucide-react";

import { primaryNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { NavigationIcon } from "@/types/navigation";
import Image from "next/image";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMobileClose: () => void;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onMouseEnter,
  onMouseLeave,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      <aside
        aria-label="Sidebar navigation"
        className="hidden border-r border-border-custom md:sticky md:top-0 md:flex md:h-screen md:self-start md:flex-col md:overflow-hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      {mobileOpen ? (
        <aside
          aria-label="Mobile sidebar navigation"
          className="fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col overflow-hidden border-r border-border-custom bg-surface md:hidden"
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-surface-muted p-1 hover:cursor-pointer"
            onClick={onMobileClose}
          >
            <X size={14} />
          </button>
          <SidebarContent collapsed={false} />
        </aside>
      ) : null}
    </>
  );
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col">
        <section aria-label="Logo section" className={"px-5 lg:px-6 py-3.75"}>
          <div aria-hidden="true" className={cn("flex items-center")}>
            {collapsed ? (
              <Image
                src={"/svgs/shared/logoCollapsed.svg"}
                alt="Logo"
                width={18}
                height={20}
                className="w-auto h-auto"
              />
            ) : (
              <Image
                src={"/svgs/shared/logoLight.svg"}
                alt="Logo"
                width={186}
                height={20}
                className="w-auto h-auto"
              />
            )}
          </div>
        </section>

        <SidebarDivider />

        <section aria-label="Workspace section" className={"flex px-3 py-2"}>
          <div className={"flex justify-between py-1.5 px-2 items-center w-full"}>
            <div className="flex gap-5 items-center flex-1">
              <div className="relative">
                <Image
                  src={"/images/sidebar/person1.webp"}
                  alt="person"
                  height={24}
                  width={24}
                  className="h-6 w-6 absolute z-10 right-[-50%] top-0"
                />
                <Image
                  src={"/images/sidebar/person2.webp"}
                  alt="person"
                  height={24}
                  width={24}
                  className="h-6 w-6 "
                />
              </div>
              {!collapsed && (
                <span className="font-medium font-sm text-sidebar-dark">
                  GTM Spaces
                </span>
              )}
            </div>
            {!collapsed && (
              <ChevronsUpDown className="text-muted" height={16} width={16} />
            )}
          </div>
        </section>

        <SidebarDivider />

        <nav aria-label="Primary navigation" className={"flex flex-col"}>
          <SidebarGroup title="Home" collapsed={collapsed}>
              {primaryNavigation.map((item) => (
                <SidebarNavItem
                  key={item.id}
                  item={item}
                  collapsed={collapsed}
                />
              ))}
            </SidebarGroup>

            <SidebarGroup title="Other" collapsed={collapsed}>
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
      </div>

      <section aria-label="Support section" className={"flex p-2"}>
        <div className="flex flex-col px-3 py-4 bg-surface-muted w-full gap-1">
          <div className="flex justify-between w-full text-sidebar-dark items-center">
            {collapsed ? (
              <Image
                src={"/svgs/shared/logoCollapsed.svg"}
                alt="Logo"
                width={18}
                height={20}
                className="w-auto h-auto"
              />
            ) : (
              <Image
                src={"/svgs/shared/logoLight.svg"}
                alt="Logo"
                width={186}
                height={22}
                className="w-auto h-auto"
              />
            )}
            <ChevronUp size={12} />
          </div>
          {!collapsed && (
            <span className="text-sm text-muted">Get Support at Bitscale </span>
          )}
        </div>
      </section>
    </div>
  );
}

function SidebarDivider() {
  return <div aria-hidden="true" className="border-b border-border-custom" />;
}

function SidebarGroup({
  title,
  children,
  collapsed,
}: {
  title: string;
  children: ReactNode;
  collapsed: boolean;
}) {
  return (
    <section className={"flex flex-col p-2 gap-2"}>
      {!collapsed && (
        <h2 className={"p-2 text-xs font-medium text-muted"}>{title}</h2>
      )}
      <ul className="flex flex-col gap-1 text-sidebar-dark">{children}</ul>
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
    <li className="flex w-full">
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
        "flex items-center gap-2 rounded-lg p-2 text-sm w-full justify-between",
        disabled && "text-muted",
        active ? "font-medium text-brand bg-surface-muted" : "font-normal",
        collapsed && "justify-center px-2",
      )}
    >
      <div className="flex gap-2 items-center">
        <Icon size={16} className="text-muted" />
        {!collapsed && <span className="truncate">{label}</span>}
      </div>
      {!collapsed && active && (
        <ChevronRight size={16} className="text-brand" />
      )}
      {!collapsed && trailingIcon ? (
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center rounded-full bg-warning-bg px-3 py-1.5 text-warning-text"
        >
          <Rocket size={12} />
        </span>
      ) : null}
    </Link>
  );
}

const sidebarIcons: Record<
  NavigationIcon | "documentation",
  typeof LayoutDashboard
> = {
  dashboard: LayoutDashboard,
  playbooks: LibraryBig,
  integrations: LinkIcon,
  people: Users,
  projects: BriefcaseBusiness,
  reports: LibraryBig,
  billing: FolderOpen,
  support: LifeBuoy,
  settings: Settings,
  documentation: BookOpenText,
};
