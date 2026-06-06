"use client";

import { useState, type ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <div
        className={cn(
          "mx-auto grid min-h-screen max-w-screen-2xl",
          isSidebarCollapsed
            ? "lg:grid-cols-[88px_minmax(0,1fr)]"
            : "lg:grid-cols-[280px_minmax(0,1fr)]",
        )}
      >
        <Sidebar
          collapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
        />
        <div className="flex min-w-0 flex-col">
          <Header />
          <main id="main-content" className="min-w-0 flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
