export function LatestUpdateCard() {
  return (
    <section aria-labelledby="latest-update-heading" className="rounded border p-4">
      <div className="flex items-start justify-between gap-3">
        <h2 id="latest-update-heading" className="text-base font-medium">
          Latest from Bitscale
        </h2>
        <div aria-hidden="true" className="flex items-center gap-1">
          <span className="h-2 w-6 rounded-full border" />
          <span className="h-2 w-2 rounded-full border" />
          <span className="h-2 w-2 rounded-full border" />
          <span className="h-2 w-2 rounded-full border" />
        </div>
      </div>
      <article className="mt-4 grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
        <div aria-hidden="true" className="min-h-32 rounded border" />
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Latest update title</h3>
          <p className="text-sm">
            Placeholder supporting copy for the featured dashboard update.
          </p>
          <p className="text-xs">Posted today</p>
        </div>
      </article>
    </section>
  );
}
