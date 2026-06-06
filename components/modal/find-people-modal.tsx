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

type FilterValue = string | string[];
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

  const selectedValueCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) {
      return count + value.length;
    }

    return value.trim() ? count + 1 : count;
  }, 0);

  const keyword = keywordQuery.trim().toLowerCase();

  const selectedLocations = Array.isArray(filters["person-location"])
    ? filters["person-location"]
    : [];

  const selectedManagementLevel =
    typeof filters["management-level"] === "string"
      ? filters["management-level"]
      : "";

  const selectedCompanyLocation =
    typeof filters["company-location"] === "string"
      ? filters["company-location"]
      : "";

  const selectedCompanyHeadcount =
    typeof filters["company-headcount"] === "string"
      ? filters["company-headcount"]
      : "";

  const filteredPeople = peopleDirectory.filter((person) => {
    const keywordMatches =
      keyword.length === 0 ||
      [person.name, person.company, person.role, person.email, person.companyWebsite ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(keyword);

    const jobTitleValue =
      typeof filters["job-title"] === "string" ? filters["job-title"].trim().toLowerCase() : "";
    const companyWebsiteValue =
      typeof filters["company-website"] === "string"
        ? filters["company-website"].trim().toLowerCase()
        : "";

    const jobTitleMatches =
      jobTitleValue.length === 0 || person.role.toLowerCase().includes(jobTitleValue);

    const companyWebsiteMatches =
      companyWebsiteValue.length === 0 ||
      (person.companyWebsite ?? "").toLowerCase().includes(companyWebsiteValue) ||
      person.company.toLowerCase().includes(companyWebsiteValue);

    const locationMatches =
      selectedLocations.length === 0 || selectedLocations.includes(person.location);

    const managementLevelMatches =
      selectedManagementLevel.length === 0 ||
      person.managementLevel === selectedManagementLevel;

    const companyLocationMatches =
      selectedCompanyLocation.length === 0 ||
      person.companyLocation === selectedCompanyLocation;

    const companyHeadcountMatches =
      selectedCompanyHeadcount.length === 0 ||
      person.companyHeadcount === selectedCompanyHeadcount;

    return (
      keywordMatches &&
      jobTitleMatches &&
      companyWebsiteMatches &&
      locationMatches &&
      managementLevelMatches &&
      companyLocationMatches &&
      companyHeadcountMatches
    );
  });

  const showEmptyState = keyword.length > 0 || selectedValueCount > 0
    ? filteredPeople.length === 0
    : false;

  const setTextFilter = (filterId: string, value: string) => {
    setFilters((current) => ({
      ...current,
      [filterId]: value,
    }));
  };

  const setSelectFilter = (filterId: string, value: string) => {
    setFilters((current) => ({
      ...current,
      [filterId]: value,
    }));
  };

  const toggleMultiSelectValue = (filterId: string, value: string) => {
    setFilters((current) => {
      const existingValues = Array.isArray(current[filterId]) ? current[filterId] : [];
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
      <div className="space-y-4 p-4">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-medium">Find People</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              rightIcon={<ChevronDown size={14} />}
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

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm">
            Found {filteredPeople.length} people. Click preview to view results.
          </p>
          <p className="text-sm">Import people from saved search or apply filters.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <aside className="space-y-4">
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
              defaultOpenIds={filterSections.map((section) => section.id)}
              getItemId={(section) => section.id}
              getItemTitle={(section) => section.title}
              getItemDescription={(section) => section.description}
              renderItem={(section) => (
                <div className="space-y-4">
                  {section.filters.map((filter) => (
                    <FilterControl
                      key={filter.id}
                      filter={filter}
                      value={filters[filter.id]}
                      onTextChange={setTextFilter}
                      onSelectChange={setSelectFilter}
                      onMultiSelectToggle={toggleMultiSelectValue}
                    />
                  ))}
                </div>
              )}
            />

            <footer className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="secondary" size="md">
                Save Search
              </Button>
              <Button type="button" variant="primary" size="md">
                Preview Result
              </Button>
            </footer>
          </aside>

          <section aria-labelledby="preview-heading" className="space-y-4 rounded border p-4">
            <header className="flex flex-wrap items-start justify-between gap-3">
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
                  <div
                    aria-hidden="true"
                    className="mx-auto mb-4 h-16 w-16 rounded border"
                  />
                  <p className="text-sm">No matching users.</p>
                </div>
              </div>
            ) : (
              <Table
                caption="Filtered people results"
                columns={previewColumns}
                rows={filteredPeople}
                getRowKey={(person) => person.id}
              />
            )}
          </section>
        </div>
      </div>
    </Modal>
  );
}

interface FilterControlProps {
  filter: FilterConfig;
  value: FilterValue | undefined;
  onTextChange: (filterId: string, value: string) => void;
  onSelectChange: (filterId: string, value: string) => void;
  onMultiSelectToggle: (filterId: string, value: string) => void;
}

function FilterControl({
  filter,
  value,
  onTextChange,
  onSelectChange,
  onMultiSelectToggle,
}: FilterControlProps) {
  const controlId = `filter-${filter.id}`;

  if (filter.type === "text") {
    return (
      <div className="space-y-2">
        <label htmlFor={controlId} className="block text-sm font-medium">
          {filter.label}
        </label>
        <input
          id={controlId}
          type="text"
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onTextChange(filter.id, event.target.value)}
          placeholder={filter.placeholder}
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>
    );
  }

  if (filter.type === "select") {
    return (
      <div className="space-y-2">
        <label htmlFor={controlId} className="block text-sm font-medium">
          {filter.label}
        </label>
        <select
          id={controlId}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onSelectChange(filter.id, event.target.value)}
          className="w-full rounded border px-3 py-2 text-sm"
        >
          <option value="">Select an option</option>
          {filter.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">{filter.label}</legend>
      <div className="flex flex-wrap gap-2">
        {filter.options?.map((option) => {
          const selectedValues = Array.isArray(value) ? value : [];
          const isChecked = selectedValues.includes(option.value);

          return (
            <label
              key={option.value}
              className="flex items-center gap-2 rounded border px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onMultiSelectToggle(filter.id, option.value)}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
