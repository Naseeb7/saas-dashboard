import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

export interface TableColumn<T> {
  id: string;
  header: string;
  className?: string;
  cell: (row: T) => ReactNode;
}

interface TableProps<T> {
  caption?: string;
  columns: TableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyState?: ReactNode;
  hideHeader?: boolean;
  expandedRowIds?: string[];
  renderExpandedRow?: (row: T) => ReactNode;
  modifyName?: boolean;
  headerClassname?: string;
}

export function Table<T>({
  caption,
  columns,
  rows,
  getRowKey,
  emptyState,
  hideHeader = false,
  expandedRowIds,
  renderExpandedRow,
  modifyName = true,
  headerClassname = "",
}: TableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center overflow-auto">
        <div className="px-4 py-6 text-sm">
          {emptyState ?? "No records available."}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto flex-1 shadow-[0_10px_20px_-12px_rgba(0,0,0,0.1)]">
      <table className="min-w-full border-collapse">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className={hideHeader ? "sr-only" : undefined}>
          <tr className={headerClassname}>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={cn(
                  "border-b border-border-custom px-4 py-2 text-xs font-medium text-sidebar text-left min-w-30 whitespace-nowrap",
                  column.className,
                  column.id === "name" && modifyName && "pl-20",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  {column.header}
                  {column.id === "name" && modifyName && <ArrowUp size={12} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Fragment key={getRowKey(row)}>
              <tr>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      "border-b border-border-custom px-4 py-2 text-xs min-w-30 whitespace-nowrap",
                      column.className,
                      expandedRowIds?.includes(getRowKey(row)) && "bg-table-bg",
                    )}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
              {expandedRowIds?.includes(getRowKey(row)) && renderExpandedRow
                ? renderExpandedRow(row)
                : null}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
