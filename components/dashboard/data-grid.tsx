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
import { cn, formatDateTime } from "@/lib/utils";
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
  expandable: boolean;
  expandedRowId: string | null;
  favoriteMap: Record<string, boolean>;
  onToggleRowExpand: (rowId: string) => void;
  onToggleFavorite: (rowId: string) => void;
}

function createColumns({
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
        <div className="flex items-center gap-3">
          {expandable ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onToggleRowExpand(row.id)}
              aria-label={
                expandedRowId === row.id ? "Collapse row" : "Expand row"
              }
            >
              {expandedRowId === row.id ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </Button>
          ) : (
            <span
              aria-hidden="true"
              className="inline-flex h-8 min-w-10 items-center justify-center rounded border border-transparent"
            />
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(row.id)}
            aria-label={
              favoriteMap[row.id] ? "Remove from starred" : "Add to starred"
            }
          >
            <Star
              size={14}
              aria-hidden="true"
              className={cn(
                favoriteMap[row.id]
                  ? "text-starred-border"
                  : "text-update-muted",
              )}
            />
          </Button>
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-lg border border-surface-muted text-brand shadow-sm"
          >
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
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-lg border text-xs border-surface-muted text-brand shadow-sm"
          >
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
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Open row actions"
        >
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
    <section aria-labelledby="grid-heading" className="px-4 py-2">
      <Table
        caption="Dashboard data grid"
        columns={createColumns({
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
          row.children?.length
            ? row.children.map((childRow) => (
                <tr key={childRow.id}>
                  {createColumns({
                    expandable: false,
                    expandedRowId: null,
                    favoriteMap,
                    onToggleRowExpand,
                    onToggleFavorite,
                  }).map((column) => (
                    <td
                      key={column.id}
                      className="border-b border-border-custom px-4 py-2 text-xs bg-table-bg"
                    >
                      {column.cell(childRow)}
                    </td>
                  ))}
                </tr>
              ))
            : null
        }
      />
    </section>
  );
}

function renderSourceIcon(source: GridSource) {
  const Icon = sourceIcons[source];
  return <Icon size={12} aria-hidden="true" />;
}
