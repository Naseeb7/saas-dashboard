"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { Accordion } from "@/components/modal/accordion";
import { Modal } from "@/components/modal/modal";
import { Button } from "@/components/shared/button";
import { Table, type TableColumn } from "@/components/shared/table";
import { filterSections } from "@/data/filters";
import { peopleDirectory } from "@/data/users";
import type { FilterConfig, FilterSection } from "@/types/filters";
import type { User } from "@/types/user";

type FilterValue = string[];
type FilterState = Record<string, FilterValue>;

interface FindPeopleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const previewColumns: TableColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    cell: (person) => person.name,
  },
  {
    id: "title",
    header: "Title",
    cell: (person) => person.role,
  },
  {
    id: "headline",
    header: "Headline",
    cell: (person) => person.email,
  },
  {
    id: "company",
    header: "Company",
    cell: (person) => person.company,
  },
  {
    id: "company-url",
    header: "Company URL",
    cell: (person) => person.companyWebsite ?? "N/A",
  },
  {
    id: "location",
    header: "Location",
    cell: (person) => person.location,
  },
];

const totalCredits = 50000;
const usedCredits = 8000;

export function FindPeopleModal({ open, onOpenChange }: FindPeopleModalProps) {
  const [keywordQuery, setKeywordQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({});

  const selectedValueCount = Object.values(filters).reduce(
    (count, value) => count + value.length,
    0,
  );

  const keyword = keywordQuery.trim().toLowerCase();

  const filteredPeople = peopleDirectory.filter((person) => {
    const keywordMatches =
      keyword.length === 0 ||
      [person.name, person.company, person.role, person.email, person.companyWebsite ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(keyword);

    const jobTitleValues = filters["job-title"] ?? [];
    const companyWebsiteValues = filters["company-website"] ?? [];
    const selectedPersonLocations = filters["person-location"] ?? [];
    const selectedCompanyLocations = filters["company-location"] ?? [];
    const selectedCompanyHeadcounts = filters["company-headcount"] ?? [];
    const selectedManagementLevels = filters["management-level"] ?? [];

    const jobTitleMatches =
      jobTitleValues.length === 0 || jobTitleValues.includes(person.role.toLowerCase());

    const companyWebsiteMatches =
      companyWebsiteValues.length === 0 ||
      companyWebsiteValues.includes((person.companyWebsite ?? "").toLowerCase());

    const locationMatches =
      selectedPersonLocations.length === 0 || selectedPersonLocations.includes(person.location);

    const companyLocationMatches =
      selectedCompanyLocations.length === 0 ||
      selectedCompanyLocations.includes(person.companyLocation ?? "");

    const companyHeadcountMatches =
      selectedCompanyHeadcounts.length === 0 ||
      selectedCompanyHeadcounts.includes(person.companyHeadcount ?? "");

    const managementLevelMatches =
      selectedManagementLevels.length === 0 ||
      selectedManagementLevels.includes(person.managementLevel ?? "");

    return (
      keywordMatches &&
      jobTitleMatches &&
      companyWebsiteMatches &&
      locationMatches &&
      companyLocationMatches &&
      companyHeadcountMatches &&
      managementLevelMatches
    );
  });

  const showEmptyState =
    keyword.length > 0 || selectedValueCount > 0 ? filteredPeople.length === 0 : false;

  const toggleMultiSelectValue = (filterId: string, value: string) => {
    setFilters((current) => {
      const existingValues = current[filterId] ?? [];
      const nextValues = existingValues.includes(value)
        ? existingValues.filter((entry) => entry !== value)
        : [...existingValues, value];

      return {
        ...current,
        [filterId]: nextValues,
      };
    });
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Find People">
      <div className="flex h-full min-h-0 flex-col p-4">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-medium">Find People</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              rightIcon={<ChevronDown size={14} aria-hidden="true" />}
            >
              Saved Search
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded border px-3 py-2 text-sm">
              {usedCredits}/{totalCredits}
            </div>
            <div className="rounded border px-3 py-2 text-sm">
              Unlock 100,000 leads with Enterprise Plan*
            </div>
          </div>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <p className="text-sm">
            Found {filteredPeople.length} people. Click preview to view results.
          </p>
          <p className="text-sm">Import people from saved search or apply filters.</p>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-none lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <aside className="flex min-h-0 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-2">
              <section aria-labelledby="keyword-heading" className="space-y-2 rounded border p-4">
                <h3 id="keyword-heading" className="text-sm font-medium">
                  People Keyword
                </h3>
                <label className="flex items-center gap-2 rounded border px-3 py-2">
                  <Search size={14} aria-hidden="true" />
                  <span className="sr-only">Search keyword</span>
                  <input
                    type="search"
                    value={keywordQuery}
                    onChange={(event) => setKeywordQuery(event.target.value)}
                    placeholder="Enter single keyword here..."
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  />
                </label>
              </section>

              <Accordion<FilterSection>
                items={filterSections}
                getItemId={(section) => section.id}
                getItemTitle={(section) => section.title}
                getItemDescription={(section) => section.description}
                renderItem={(section) => (
                  <div className="space-y-3">
                    {section.filters.map((filter) => (
                      <FilterOptions
                        key={filter.id}
                        filter={filter}
                        selectedValues={filters[filter.id] ?? []}
                        onToggleValue={toggleMultiSelectValue}
                      />
                    ))}
                  </div>
                )}
              />
            </div>
          </aside>

          <section aria-labelledby="preview-heading" className="flex min-h-0 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pl-2">
              <header className="flex flex-wrap items-start justify-between gap-3 rounded border p-4">
                <div>
                  <h3 id="preview-heading" className="text-sm font-medium">
                    Preview
                  </h3>
                  <p className="text-sm">
                    Results table area for the current filter combination.
                  </p>
                </div>
                <p className="text-sm" aria-label="results count">
                  {filteredPeople.length} results
                </p>
              </header>

              {showEmptyState ? (
                <div className="flex min-h-64 items-center justify-center border p-6">
                  <div className="text-center">
                    <div aria-hidden="true" className="mx-auto mb-4 h-16 w-16 rounded border" />
                    <p className="text-sm">No matching users.</p>
                  </div>
                </div>
              ) : (
                <div className="rounded border">
                  <Table
                    caption="Filtered people results"
                    columns={previewColumns}
                    rows={filteredPeople}
                    getRowKey={(person) => person.id}
                  />
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="flex flex-wrap items-center gap-3 border-t pt-4">
          <Button type="button" variant="secondary" size="md">
            Save Search
          </Button>
          <Button type="button" variant="primary" size="md">
            Preview Result
          </Button>
        </footer>
      </div>
    </Modal>
  );
}

interface FilterOptionsProps {
  filter: FilterConfig;
  selectedValues: string[];
  onToggleValue: (filterId: string, value: string) => void;
}

function FilterOptions({ filter, selectedValues, onToggleValue }: FilterOptionsProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">{filter.label}</legend>
      <div className="space-y-2">
        {filter.options?.map((option) => {
          const isChecked = selectedValues.includes(option.value);

          return (
            <label
              key={option.value}
              className="flex items-center gap-2 rounded border px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleValue(filter.id, option.value)}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
