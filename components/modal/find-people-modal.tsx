"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Eye,
  FileSearchCorner,
  Search,
  Unlock,
  User as UserIcon,
} from "lucide-react";

import { Accordion } from "@/components/modal/accordion";
import { Modal } from "@/components/modal/modal";
import { Button } from "@/components/shared/button";
import { Table, type TableColumn } from "@/components/shared/table";
import { filterSections } from "@/data/filters";
import { peopleDirectory } from "@/data/users";
import type { FilterConfig, FilterSection } from "@/types/filters";
import type { User } from "@/types/user";
import Image from "next/image";

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

  const keyword = keywordQuery.trim().toLowerCase();

  const filteredPeople = peopleDirectory.filter((person) => {
    const keywordMatches =
      keyword.length === 0 ||
      [
        person.name,
        person.company,
        person.role,
        person.email,
        person.companyWebsite ?? "",
      ]
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
      jobTitleValues.length === 0 ||
      jobTitleValues.includes(person.role.toLowerCase());

    const companyWebsiteMatches =
      companyWebsiteValues.length === 0 ||
      companyWebsiteValues.includes(
        (person.companyWebsite ?? "").toLowerCase(),
      );

    const locationMatches =
      selectedPersonLocations.length === 0 ||
      selectedPersonLocations.includes(person.location);

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
      <div className="flex h-full min-h-0 flex-1 flex-col gap-6 overflow-hidden">
        <div className="flex min-h-0 flex-1 gap-5 overflow-hidden">
          <aside className="flex h-full min-h-0 w-1/3 flex-col overflow-y-auto">
            <header className="flex w-full justify-between text-modal-header sticky top-0 bg-surface">
              <h2 className="text-lg font-extrabold ">Find People</h2>
              <span className="flex gap-1 py-0.5 px-2.5 bg-surface-muted rounded-md items-center">
                <ChevronDown size={14} />{" "}
                <span className="text-xs font-medium">Saved Search</span>
              </span>
            </header>
            <section
              aria-labelledby="keyword-heading"
              className="flex flex-col gap-1 mt-6 py-4 border-b border-border-custom"
            >
              <h3
                id="keyword-heading"
                className="font-bold text-modal-header flex gap-2 items-center"
              >
                <UserIcon size={16} />
                People Keyword
              </h3>
              <label className="flex items-center gap-2 border-b-2 border-modal-search-border py-3">
                <Search size={16} aria-hidden="true" />
                <span className="sr-only">Search keyword</span>
                <input
                  type="search"
                  value={keywordQuery}
                  onChange={(event) => setKeywordQuery(event.target.value)}
                  placeholder="Enter single keyword here..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                />
              </label>
            </section>

            <Accordion<FilterSection>
              items={filterSections}
              getItemId={(section) => section.id}
              getItemTitle={(section) => section.title}
              getItemDescription={(section) => section.description}
              renderItem={(section) => (
                <div>
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
          </aside>

          <section
            aria-labelledby="preview-heading"
            className="flex h-full min-h-0 w-2/3 self-stretch flex-col overflow-hidden"
          >
            <div className="flex h-full min-h-0 flex-1 flex-col gap-2">
              <header className="flex justify-between flex-col gap-1">
                <div className="flex self-end px-3 py-1 gap-1.5 bg-modal-plan-bg text-modal-plan-text text-xs font-medium items-center rounded-2xl">
                  <Search size={12.8} />
                  {usedCredits}/{totalCredits}
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-icon-bg-dark">
                    Found {filteredPeople.length} results. Click preview to view
                    results
                  </span>
                  <span className="font-bold text-warning-text flex items-center gap-1">
                    <Unlock size={16} />
                    Unlock 100,000 leads with Enterprise Plan*
                  </span>
                </div>
              </header>

              <div className="flex min-h-0 flex-1 flex-col overflow-hidden pr-2 pb-2">
                <div className="flex min-h-0 flex-1 flex-col overflow-auto rounded-t-lg bg-surface inset-shadow-sm inset-shadow-black/10">
                  <Table
                    caption="Filtered people results"
                    columns={previewColumns}
                    rows={filteredPeople}
                    getRowKey={(person) => person.id}
                    modifyName={false}
                    headerClassname="bg-table-bg"
                    emptyState={<EmptyState />}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="flex flex-wrap items-center gap-4 w-1/3">
          <Button
            type="button"
            variant="primary"
            className="w-full md:w-2/5 bg-border-custom text-sidebar"
            leftIcon={<FileSearchCorner size={16} />}
          >
            Save Search
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full md:w-1/2"
            leftIcon={<Eye size={16} className="text-surface" />}
          >
            Preview Result
          </Button>
        </footer>
      </div>
    </Modal>
  );
}

function EmptyState() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <Image
        src={"/images/shared/emptyResult.webp"}
        alt="No Results"
        height={135}
        width={188}
      />
      <div className="flex flex-col gap-0.5 text-xs font-medium text-update-muted text-center w-2/3">
        <span>
          Start your Company search , preview, and import companies for
          enrichment by applying any filter in the left panel.
        </span>
        <span>OR</span>
        <span>Import companies from saved Search. </span>
      </div>
    </div>
  );
}

interface FilterOptionsProps {
  filter: FilterConfig;
  selectedValues: string[];
  onToggleValue: (filterId: string, value: string) => void;
}

function FilterOptions({
  filter,
  selectedValues,
  onToggleValue,
}: FilterOptionsProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      {/* <legend className="sr-only">{filter.label}</legend> */}
      {filter.options?.map((option) => {
        const isChecked = selectedValues.includes(option.value);

        return (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 py-2 text-xs text-modal-header"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggleValue(filter.id, option.value)}
              className="sr-only peer"
            />
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                isChecked
                  ? "border-brand bg-brand"
                  : "border-border-custom bg-transparent"
              }`}
              aria-hidden="true"
            >
              {isChecked ? <Check size={12} className="text-surface" /> : null}
            </span>
            <span>{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
