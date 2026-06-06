"use client";

interface SearchSectionProps {
  onOpenFindPeople: () => void;
}

export function SearchSection({ onOpenFindPeople }: SearchSectionProps) {
  return (
    <section aria-labelledby="search-heading" className="rounded border p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="search-heading" className="text-base font-medium">
            Search
          </h2>
          <p className="mt-1 text-sm">Placeholder search area.</p>
        </div>
        <button
          type="button"
          onClick={onOpenFindPeople}
          className="rounded border px-3 py-2 text-sm"
        >
          Find People
        </button>
      </div>
    </section>
  );
}
