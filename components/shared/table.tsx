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
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className={hideHeader ? "sr-only" : undefined}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={cn(
                  "border-b border-border-custom px-4 py-2 text-xs font-medium text-sidebar text-left",
                  column.className,
                  column.id === "name" && "pl-20",
                )}
              >
                <span className="inline-flex items-center gap-2">
                  {column.header}
                  {column.id === "name" && <ArrowUp size={12} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-sm">
                {emptyState ?? "No records available."}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <Fragment key={getRowKey(row)}>
                <tr>
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        "border-b border-border-custom px-4 py-2 text-xs",
                        column.className,
                        expandedRowIds?.includes(getRowKey(row)) &&
                          "bg-table-bg",
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
