"use client";

import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderKanban,
  Globe,
  MapPin,
  MoreHorizontal,
  Link2,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

import { GridToolbar, type GridTab, type GridViewMode } from "@/components/dashboard/grid-toolbar";
import { Table, type TableColumn } from "@/components/shared/table";
import { Button } from "@/components/shared/button";
import { formatDateTime } from "@/lib/utils";
import { gridItems } from "@/data/grid-items";
import type { GridItem, GridSource } from "@/types/grid";

const sourceIcons: Record<GridSource, typeof Link2> = {
  linkedin: Link2,
  "sales-nav": FolderKanban,
  website: Globe,
  csv: FileText,
  google: Search,
  maps: MapPin,
  factors: Sparkles,
  hubspot: BarChart3,
};

const sourceLabels: Record<GridSource, string> = {
  linkedin: "LinkedIn",
  "sales-nav": "Sales Nav",
  website: "Website",
  csv: "CSV",
  google: "Google",
  maps: "Maps",
  factors: "Factors",
  hubspot: "HubSpot",
};

const baseColumns: TableColumn<GridItem>[] = [
  {
    id: "name",
    header: "Name",
    cell: (row) => row.name,
  },
  {
    id: "edited-by",
    header: "Edited By",
    cell: (row) => row.editedBy.name,
  },
  {
    id: "last-edited",
    header: "Last Edited",
    cell: (row) => formatDateTime(row.lastEditedAt),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button type="button" variant="ghost" size="sm" aria-label="Open row actions">
        <MoreHorizontal size={14} />
      </Button>
    ),
  },
];

export function DataGrid() {
  const [activeTab, setActiveTab] = useState<GridTab>("my-grids");
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<GridViewMode>("table");
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(gridItems.map((item) => [item.id, item.isFavorite])),
  );
  const [expandedRowId, setExpandedRowId] = useState<string | null>(gridItems[0]?.id ?? null);

  const visibleRows = gridItems
    .filter((row) => {
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
    })
    .map((row) => ({
      ...row,
      isFavorite: favoriteMap[row.id] ?? row.isFavorite,
    }));

  const columns = [
    {
      ...baseColumns[0],
      cell: (row: GridItem) => (
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setExpandedRowId((current) => (current === row.id ? null : row.id))
            }
            aria-label={expandedRowId === row.id ? "Collapse row" : "Expand row"}
          >
            {expandedRowId === row.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              setFavoriteMap((current) => ({
                ...current,
                [row.id]: !current[row.id],
              }))
            }
            aria-label={favoriteMap[row.id] ? "Remove from starred" : "Add to starred"}
          >
            <Star size={14} aria-hidden="true" />
          </Button>
          <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded border">
            {renderSourceIcon(row.source)}
          </span>
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      ...baseColumns[1],
      cell: (row: GridItem) => (
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full border text-xs">
            {row.editedBy.initials}
          </span>
          <span>{row.editedBy.name}</span>
        </div>
      ),
    },
    baseColumns[2],
    baseColumns[3],
  ] satisfies TableColumn<GridItem>[];

  return (
    <section aria-labelledby="grid-heading" className="space-y-4 rounded border p-4">
      <div className="flex items-start justify-between gap-4">
        <h2 id="grid-heading" className="text-base font-medium">
          My Grids
        </h2>
        <span aria-hidden="true" className="text-sm">
          Grid view: {viewMode}
        </span>
      </div>

      <GridToolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <Table
        caption="Dashboard data grid"
        columns={columns}
        rows={visibleRows}
        getRowKey={(row) => row.id}
        emptyState="No grids match the current view."
        expandedRowIds={expandedRowId ? [expandedRowId] : []}
        renderExpandedRow={(row) => (
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-flex h-4 w-4 items-center justify-center rounded border text-xs">
              {sourceLabels[row.source]}
            </span>
            <span>Expanded row details placeholder for {row.name}.</span>
          </div>
        )}
      />
    </section>
  );
}

function renderSourceIcon(source: GridSource) {
  const Icon = sourceIcons[source];
  return <Icon size={12} aria-hidden="true" />;
}
