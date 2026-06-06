import { currentUser } from "@/data/users";

export function Header() {
  return (
    <header aria-label="Dashboard header" className="border-b">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded border px-3 py-2 text-sm">
            Credits placeholder
          </div>
          <div className="rounded border px-3 py-2 text-sm">
            Plan placeholder
          </div>
          <div className="flex items-center gap-3 rounded border px-3 py-2">
            <div
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full border text-xs"
            >
              {currentUser.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{currentUser.name}</p>
              <p className="truncate text-xs">{currentUser.role}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="rounded border px-3 py-2 text-sm">
            Action button
          </button>
          <button type="button" className="rounded border px-3 py-2 text-sm">
            Action button
          </button>
          <button type="button" className="rounded border px-3 py-2 text-sm">
            Action button
          </button>
        </div>
      </div>
    </header>
  );
}
