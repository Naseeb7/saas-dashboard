"use client";

import { useState } from "react";

import { DataGrid } from "@/components/dashboard/data-grid";
import {
  GridToolbar,
  type GridTab,
  type GridViewMode,
} from "@/components/dashboard/grid-toolbar";
import { LatestUpdateCard } from "@/components/dashboard/latest-update-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { AppShell } from "@/components/layout/app-shell";
import { FindPeopleModal } from "@/components/modal/find-people-modal";
import { Button } from "@/components/shared/button";
import { gridItems } from "@/data/grid-items";
import { currentUser } from "@/data/users";
import type { GridItem } from "@/types/grid";
import { Building, Plus, User } from "lucide-react";

export default function Home() {
  const [isFindPeopleOpen, setIsFindPeopleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<GridTab>("my-grids");
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<GridViewMode>("table");
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>(() =>
    createFavoriteMap(gridItems),
  );
  const [expandedRowId, setExpandedRowId] = useState<string | null>(
    gridItems[0]?.id ?? null,
  );

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
        <section
          aria-label="Dashboard content"
          className="flex flex-col gap-6 p-4 lg:p-5.25"
        >
          <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold text-sidebar-dark">
                Welcome back, {currentUser.name}!
              </p>
              <p className="text-gray-500">
                Here&apos;s your daily scoop on Bitscale!
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                type="button"
                leftIcon={<Building size={16} className="text-success-text" />}
                className="w-full sm:w-auto"
              >
                Find Companies
              </Button>
              <Button
                type="button"
                leftIcon={<User size={16} className="text-brand" />}
                onClick={() => setIsFindPeopleOpen(true)}
                className="w-full sm:w-auto"
              >
                Find People
              </Button>
              <Button
                type="button"
                leftIcon={<Plus size={14} className="text-background" />}
                variant="secondary"
                className="w-full sm:w-auto text-base"
              >
                New Grid
              </Button>
            </div>
          </header>
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
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
      <FindPeopleModal
        open={isFindPeopleOpen}
        onOpenChange={setIsFindPeopleOpen}
      />
    </>
  );
}

function createFavoriteMap(rows: GridItem[]) {
  const map: Record<string, boolean> = {};

  for (const row of rows) {
    map[row.id] = row.isFavorite;

    for (const childRow of row.children ?? []) {
      map[childRow.id] = childRow.isFavorite;
    }
  }

  return map;
}
