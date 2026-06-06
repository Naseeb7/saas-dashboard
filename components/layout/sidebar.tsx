import Link from "next/link";

import { primaryNavigation, supportNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside
      aria-label="Sidebar navigation"
      className="hidden border-r md:flex md:flex-col"
    >
      <div className="flex h-full min-h-screen w-full flex-col gap-6 p-4 lg:p-6">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded"
          >
            Logo
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Workspace</p>
            <button
              type="button"
              aria-label="Select workspace"
              className="mt-1 flex w-full items-center justify-between gap-2 text-left text-sm"
            >
              <span className="truncate">Acme Growth Team</span>
              <span aria-hidden="true">v</span>
            </button>
          </div>
        </div>

        <nav aria-label="Primary navigation" className="flex-1">
          <ul className="space-y-1">
            {primaryNavigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={item.isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded px-3 py-2 text-sm",
                    item.isActive ? "font-medium" : "font-normal",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded border text-xs"
                  >
                    {item.icon.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="truncate">{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto text-xs">{item.badge}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-label="Support links">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide">
            Support
          </h2>
          <ul className="space-y-1">
            {supportNavigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded px-3 py-2 text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 items-center justify-center rounded border text-xs"
                  >
                    {item.icon.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
