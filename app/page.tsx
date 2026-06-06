"use client";

import { useState } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { DataGrid } from "@/components/dashboard/data-grid";
import { LatestUpdateCard } from "@/components/dashboard/latest-update-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { SearchSection } from "@/components/dashboard/search-section";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { Modal } from "@/components/modal/modal";

export default function Home() {
  const [isFindPeopleOpen, setIsFindPeopleOpen] = useState(false);

  return (
    <>
      <AppShell>
        <section aria-label="Dashboard content" className="space-y-4 p-4 lg:p-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <WelcomeCard />
            <LatestUpdateCard />
            <ProgressCard />
          </div>
          <SearchSection onOpenFindPeople={() => setIsFindPeopleOpen(true)} />
          <DataGrid />
        </section>
      </AppShell>
      <Modal
        open={isFindPeopleOpen}
        onOpenChange={setIsFindPeopleOpen}
        title="Find People"
      >
        <div className="p-4 text-sm">
          Placeholder modal content for the Find People flow.
        </div>
      </Modal>
    </>
  );
}
