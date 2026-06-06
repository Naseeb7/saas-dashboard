"use client";

import { useState } from "react";

import { DataGrid } from "@/components/dashboard/data-grid";
import { GridToolbar, type GridTab, type GridViewMode } from "@/components/dashboard/grid-toolbar";
import { LatestUpdateCard } from "@/components/dashboard/latest-update-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { AppShell } from "@/components/layout/app-shell";
import { FindPeopleModal } from "@/components/modal/find-people-modal";
import { Button } from "@/components/shared/button";
import { gridItems } from "@/data/grid-items";
import { currentUser } from "@/data/users";

export default function Home() {
  const [isFindPeopleOpen, setIsFindPeopleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<GridTab>("my-grids");
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<GridViewMode>("table");
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(gridItems.map((item) => [item.id, item.isFavorite])),
  );
  const [expandedRowId, setExpandedRowId] = useState<string | null>(gridItems[0]?.id ?? null);

  const visibleRows = gridItems.filter((row) => {
    if (activeTab === "starred" && !favoriteMap[row.id]) {
      return false;
    }

    if (!searchValue.trim()) {
      return true;
    }

    const query = searchValue.trim().toLowerCase();
    return (
      row.name.toLowerCase().includes(query) ||
      row.editedBy.name.toLowerCase().includes(query) ||
      row.source.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <AppShell>
        <section aria-label="Dashboard content" className="space-y-4 p-4 lg:p-6">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-1">
              <p className="text-sm">Welcome back, {currentUser.name}</p>
              <p>Here&apos;s your daily scoop on Bitscale!</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" size="md">
                Find Companies
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setIsFindPeopleOpen(true)}
              >
                Find People
              </Button>
              <Button type="button" variant="primary" size="md">
                New Grid
              </Button>
            </div>
          </header>
          <div className="grid gap-4 lg:grid-cols-2">
            <LatestUpdateCard />
            <ProgressCard />
          </div>
          <GridToolbar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <DataGrid
            rows={visibleRows.map((row) => ({
              ...row,
              isFavorite: favoriteMap[row.id] ?? row.isFavorite,
            }))}
            expandedRowId={expandedRowId}
            favoriteMap={favoriteMap}
            onToggleRowExpand={(rowId) =>
              setExpandedRowId((current) => (current === rowId ? null : rowId))
            }
            onToggleFavorite={(rowId) =>
              setFavoriteMap((current) => ({
                ...current,
                [rowId]: !current[rowId],
              }))
            }
          />
        </section>
      </AppShell>
      <FindPeopleModal open={isFindPeopleOpen} onOpenChange={setIsFindPeopleOpen} />
    </>
  );
}
