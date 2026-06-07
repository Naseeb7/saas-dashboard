"use client";

import { useEffect, useState, type ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopExpandable, setIsDesktopExpandable] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const updateDesktopExpandable = () => {
      setIsDesktopExpandable(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setIsSidebarCollapsed(true);
      }
    };

    updateDesktopExpandable();
    mediaQuery.addEventListener("change", updateDesktopExpandable);

    return () => mediaQuery.removeEventListener("change", updateDesktopExpandable);
  }, []);

  return (
    <div className="min-h-screen">
      {isMobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      ) : null}
      <div
        className={cn(
          "mx-auto grid min-h-screen max-w-screen-2xl",
          "md:grid-cols-[88px_minmax(0,1fr)]",
          isDesktopExpandable && !isSidebarCollapsed
            ? "xl:grid-cols-[280px_minmax(0,1fr)]"
            : "xl:grid-cols-[88px_minmax(0,1fr)]",
        )}
      >
        <Sidebar
          collapsed={!isDesktopExpandable ? true : isSidebarCollapsed}
          mobileOpen={isMobileSidebarOpen}
          onMouseEnter={
            isDesktopExpandable ? () => setIsSidebarCollapsed(false) : undefined
          }
          onMouseLeave={
            isDesktopExpandable ? () => setIsSidebarCollapsed(true) : undefined
          }
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
        <div className="flex min-w-0 flex-col">
          <Header onMobileMenuClick={() => setIsMobileSidebarOpen(true)} />
          <main id="main-content" className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
