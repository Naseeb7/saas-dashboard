"use client";

import type { ChangeEvent } from "react";
import { LayoutGrid, List, Search } from "lucide-react";

import { Button } from "@/components/shared/button";

export type GridTab = "my-grids" | "starred";
export type GridViewMode = "table" | "compact";

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
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <GridTabs activeTab={activeTab} onTabChange={onTabChange} />

      <div className="flex flex-wrap items-center gap-3">
        <GridSearchField value={searchValue} onChange={onSearchChange} />
        <GridViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </div>
    </div>
  );
}

function GridTabs({
  activeTab,
  onTabChange,
}: Pick<GridToolbarProps, "activeTab" | "onTabChange">) {
  return (
    <div role="tablist" aria-label="Grid views" className="flex items-center gap-2">
      <Button
        type="button"
        variant={activeTab === "my-grids" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onTabChange("my-grids")}
        aria-pressed={activeTab === "my-grids"}
      >
        My Grids
      </Button>
      <Button
        type="button"
        variant={activeTab === "starred" ? "primary" : "ghost"}
        size="sm"
        onClick={() => onTabChange("starred")}
        aria-pressed={activeTab === "starred"}
      >
        Starred
      </Button>
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
    <label className="flex min-w-0 items-center gap-2 rounded border px-3 py-2">
      <Search size={14} aria-hidden="true" />
      <span className="sr-only">Search grids and workbooks</span>
      <input
        type="search"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        placeholder="Search grids and workbooks..."
        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
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
    <div className="flex items-center gap-1 rounded border p-1" aria-label="View toggle">
      <Button
        type="button"
        variant={viewMode === "table" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("table")}
        aria-pressed={viewMode === "table"}
        aria-label="Table view"
      >
        <List size={14} aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant={viewMode === "compact" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("compact")}
        aria-pressed={viewMode === "compact"}
        aria-label="Compact view"
      >
        <LayoutGrid size={14} aria-hidden="true" />
      </Button>
    </div>
  );
}
