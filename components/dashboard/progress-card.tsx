const checklistItems = [
  {
    id: "create-list",
    label: "Create your data list",
    completed: true,
  },
  {
    id: "connect-integration",
    label: "Connect an integration",
    completed: true,
  },
  {
    id: "learn-bitagent",
    label: "Learn about BitAgent",
    completed: true,
  },
  {
    id: "customise-provider",
    label: "Customise waterfall providers",
    completed: false,
  },
];

export function ProgressCard() {
  return (
    <section aria-labelledby="progress-heading" className="rounded border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="progress-heading" className="text-base font-medium">
            Complete product demo
          </h2>
          <p className="mt-1 text-sm">
            Placeholder onboarding progress for the current workspace.
          </p>
        </div>
        <p className="text-sm" aria-label="Progress percent">
          75%
        </p>
      </div>

      <div className="mt-4" aria-label="Progress bar placeholder">
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={75}
          aria-valuetext="75 percent complete"
          className="h-2 rounded border"
        />
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {checklistItems.map((item) => (
          <li key={item.id} className="flex items-center gap-2 text-sm">
            <span
              aria-hidden="true"
              className="inline-flex h-4 w-4 items-center justify-center rounded-full border"
            >
              {item.completed ? "•" : "o"}
            </span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
