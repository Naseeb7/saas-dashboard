"use client";

import type { ChangeEvent } from "react";
import { LayoutGrid, List, Search } from "lucide-react";

import { cn } from "@/lib/utils";

export type GridTab = "my-grids" | "starred";
export type GridViewMode = "table" | "grid";

interface GridToolbarProps {
  activeTab: GridTab;
  onTabChange: (tab: GridTab) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  viewMode: GridViewMode;
  onViewModeChange: (mode: GridViewMode) => void;
}

export function GridToolbar({
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: GridToolbarProps) {
  return (
    <div className="flex flex-col gap-4 px-3 lg:flex-row lg:items-start lg:justify-between lg:px-5">
      <GridTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className="flex w-full flex-wrap items-center justify-end gap-6 lg:w-1/3">
        <GridSearchField value={searchValue} onChange={onSearchChange} />
        <GridViewToggle
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
      </div>
    </div>
  );
}

function GridTabs({
  activeTab,
  onTabChange,
}: Pick<GridToolbarProps, "activeTab" | "onTabChange">) {
  return (
    <div role="tablist" aria-label="Grid views" className="flex">
      <div className="relative flex gap-8 border-b border-border-custom  px-3">
        <button
          type="button"
          onClick={() => onTabChange("my-grids")}
          aria-pressed={activeTab === "my-grids"}
          className={cn(
            "font-medium transition-colors duration-200 border-border-custom pb-3 px-2",
            activeTab === "my-grids"
              ? "text-brand border-b border-brand"
              : "text-muted",
          )}
        >
          My Grids
        </button>
        <button
          type="button"
          onClick={() => onTabChange("starred")}
          aria-pressed={activeTab === "starred"}
          className={cn(
            "font-medium transition-colors duration-200 border-border-custom pb-3 px-2",
            activeTab === "starred"
              ? "text-brand border-b border-brand"
              : "text-muted",
          )}
        >
          Starred
        </button>
      </div>
    </div>
  );
}

function GridSearchField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex w-full items-center gap-4 rounded-[8.5px] bg-surface-muted px-3 py-2.5 lg:w-4/5">
      <Search size={14} aria-hidden="true" className="text-muted" />
      <input
        type="search"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        placeholder="Search grids and workbooks..."
        className="bg-transparent text-sm outline-none placeholder:text-muted flex-1"
      />
    </label>
  );
}

function GridViewToggle({
  viewMode,
  onViewModeChange,
}: {
  viewMode: GridViewMode;
  onViewModeChange: (mode: GridViewMode) => void;
}) {
  return (
    <div
      className="flex h-auto rounded-full bg-surface-muted px-2.25 py-2.25"
      onClick={() => onViewModeChange(viewMode === "table" ? "grid" : "table")}
      aria-label={
        viewMode === "table" ? "Switch to grid view" : "Switch to table view"
      }
    >
      {viewMode === "table" ? <List size={14} /> : <LayoutGrid size={14} />}
    </div>
  );
}
