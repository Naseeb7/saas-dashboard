import { Table, type TableColumn } from "@/components/shared/table";
import { formatDateTime } from "@/lib/utils";
import { gridItems } from "@/data/grid-items";
import type { GridItem } from "@/types/grid";

const columns: TableColumn<GridItem>[] = [
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
    cell: (row) => (
      <div className="flex flex-wrap gap-2">
        {row.actions.map((action) => (
          <button key={action.id} type="button" className="rounded border px-2 py-1 text-xs">
            {action.label}
          </button>
        ))}
      </div>
    ),
  },
];

export function DataGrid() {
  return (
    <section aria-labelledby="grid-heading" className="rounded border p-4">
      <h2 id="grid-heading" className="mb-4 text-base font-medium">
        Data grid
      </h2>
      <Table
        caption="Dashboard data grid"
        columns={columns}
        rows={gridItems}
        getRowKey={(row) => row.id}
      />
    </section>
  );
}
