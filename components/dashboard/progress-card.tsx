import { Check, ClipboardCheck } from "lucide-react";

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
    <section
      aria-labelledby="progress-heading"
      className="flex flex-col px-5 py-4 rounded-lg bg-linear-to-br from-0% to-70% from-update-bg to-background border border-update-bg"
    >
      <div className="flex items-center gap-2.5">
        <div className="h-8.25 w-8.25 rounded-full bg-gray-800 flex justify-center items-center text-gray-50">
          <ClipboardCheck size={18} />
        </div>
        <div className="flex flex-col gap-0.5 text-progress-text-dark">
          <h3 className="font-medium ">Complete product demo</h3>
          <span className="text-xs">
            92% of users nailed BitScale after this walkthrough
          </span>
        </div>
      </div>

      <div
        className="mt-2.5 flex gap-2.25 items-center"
        aria-label="Progress bar placeholder"
      >
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={75}
          aria-valuetext="75 percent complete"
          className="h-1 rounded w-5/6 bg-border-custom overflow-hidden"
        >
          <div className="h-full w-3/4 bg-success-text rounded" />
        </div>
        <span className="text-success-text text-[10px] font-semibold">75%</span>
      </div>

      <ul className="mt-4 grid gap-x-1 gap-y-6 sm:grid-cols-2 px-2 py-1">
        {checklistItems.map((item) => (
          <li key={item.id} className="flex items-center gap-1.5">
            {item.completed ? (
              <span className="h-3.5 w-3.5 rounded-full bg-update-text flex items-center justify-center">
                <Check size={8.4} className="text-background" />
              </span>
            ) : (
              <span className="border-[1.4px] border-check-border h-3.5 w-3.5 rounded-full" />
            )}
            <span className="text-xs font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
