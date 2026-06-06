import { AppShell } from "@/components/layout/app-shell";
import { DataGrid } from "@/components/dashboard/data-grid";
import { LatestUpdateCard } from "@/components/dashboard/latest-update-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { SearchSection } from "@/components/dashboard/search-section";
import { WelcomeCard } from "@/components/dashboard/welcome-card";

export default function Home() {
  return (
    <AppShell>
      <section aria-label="Dashboard content" className="space-y-4 p-4 lg:p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <WelcomeCard />
          <LatestUpdateCard />
          <ProgressCard />
        </div>
        <SearchSection onOpenFindPeople={() => {}} />
        <DataGrid />
      </section>
    </AppShell>
  );
}
