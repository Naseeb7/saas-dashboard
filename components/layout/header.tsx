"use client";

import { ArrowRight, Plus, Search, Users } from "lucide-react";

import { Button } from "@/components/shared/button";
import { currentUser } from "@/data/users";

export function Header() {
  return (
    <header aria-label="Dashboard header" className="border-b">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded border px-3 py-2 text-sm">
            Credits: 450000 / 550000
          </div>
          <div className="rounded border px-3 py-2 text-sm">
            Booster Plan
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
          <Button variant="secondary" size="sm" leftIcon={<Search size={14} />}>
            Find Companies
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<Users size={14} />}>
            Find People
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus size={14} />} rightIcon={<ArrowRight size={14} />}>
            New Grid
          </Button>
        </div>
      </div>
    </header>
  );
}
