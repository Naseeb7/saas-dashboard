import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

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
}

export function Table<T>({
  caption,
  columns,
  rows,
  getRowKey,
  emptyState,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={cn("border-b px-4 py-3 text-left text-sm", column.className)}
              >
                {column.header}
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
              <tr key={getRowKey(row)}>
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn("border-b px-4 py-3 text-sm", column.className)}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
