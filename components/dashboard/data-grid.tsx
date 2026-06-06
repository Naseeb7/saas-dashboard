"use client";

import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderKanban,
  Globe,
  Link2,
  MapPin,
  MoreHorizontal,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "@/components/shared/button";
import { Table, type TableColumn } from "@/components/shared/table";
import { formatDateTime } from "@/lib/utils";
import type { GridItem, GridRowBase, GridSource } from "@/types/grid";

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

interface RowRenderOptions {
  depth: number;
  expandable: boolean;
  expandedRowId: string | null;
  favoriteMap: Record<string, boolean>;
  onToggleRowExpand: (rowId: string) => void;
  onToggleFavorite: (rowId: string) => void;
}

function createColumns({
  depth,
  expandable,
  expandedRowId,
  favoriteMap,
  onToggleRowExpand,
  onToggleFavorite,
}: RowRenderOptions): TableColumn<GridRowBase>[] {
  return [
    {
      id: "name",
      header: "Name",
      cell: (row) => (
        <div className="flex items-center gap-3" style={{ paddingLeft: `${depth * 24}px` }}>
          {expandable ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onToggleRowExpand(row.id)}
              aria-label={expandedRowId === row.id ? "Collapse row" : "Expand row"}
            >
              {expandedRowId === row.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </Button>
          ) : (
            <span aria-hidden="true" className="inline-flex h-8 w-8" />
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(row.id)}
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
      id: "edited-by",
      header: "Edited By",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full border text-xs">
            {row.editedBy.initials}
          </span>
          <span>{row.editedBy.name}</span>
        </div>
      ),
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
}

interface DataGridProps {
  rows: GridItem[];
  expandedRowId: string | null;
  favoriteMap: Record<string, boolean>;
  onToggleRowExpand: (rowId: string) => void;
  onToggleFavorite: (rowId: string) => void;
}

export function DataGrid({
  rows,
  expandedRowId,
  favoriteMap,
  onToggleRowExpand,
  onToggleFavorite,
}: DataGridProps) {
  const expandedRows = rows.flatMap((row) => {
    if (row.id !== expandedRowId || row.children?.length === 0) {
      return [];
    }

    return [row.id];
  });

  return (
    <section aria-labelledby="grid-heading" className="space-y-4 rounded border p-4">
      <h2 id="grid-heading" className="sr-only">
        Dashboard data grid
      </h2>
      <Table
        caption="Dashboard data grid"
        columns={createColumns({
          depth: 0,
          expandable: true,
          expandedRowId,
          favoriteMap,
          onToggleRowExpand,
          onToggleFavorite,
        })}
        rows={rows}
        getRowKey={(row) => row.id}
        emptyState="No grids match the current view."
        expandedRowIds={expandedRows}
        renderExpandedRow={(row) =>
          row.children?.length ? (
            <div className="pl-8">
              <Table
                caption={`${row.name} child grids`}
                columns={createColumns({
                  depth: 1,
                  expandable: false,
                  expandedRowId: null,
                  favoriteMap,
                  onToggleRowExpand,
                  onToggleFavorite,
                })}
                rows={row.children}
                getRowKey={(childRow) => childRow.id}
                emptyState="No nested grids available."
                hideHeader
              />
            </div>
          ) : null
        }
      />
    </section>
  );
}

function renderSourceIcon(source: GridSource) {
  const Icon = sourceIcons[source];
  return <Icon size={12} aria-hidden="true" />;
}
