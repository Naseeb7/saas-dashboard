"use client";

import { useState } from "react";

import { Accordion } from "@/components/modal/accordion";
import { Modal } from "@/components/modal/modal";
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
    id: "company",
    header: "Company",
    cell: (person) => person.company,
  },
  {
    id: "role",
    header: "Role",
    cell: (person) => person.role,
  },
  {
    id: "location",
    header: "Location",
    cell: (person) => person.location,
  },
];

export function FindPeopleModal({ open, onOpenChange }: FindPeopleModalProps) {
  const [filters, setFilters] = useState<FilterState>({});

  const selectedValueCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) {
      return count + value.length;
    }

    return value.trim() ? count + 1 : count;
  }, 0);

  const keyword = [
    filters["job-title"],
    filters["company-website"],
  ]
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

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

  const hasNoFilters = selectedValueCount === 0 && keyword.length === 0;

  const filteredPeople = hasNoFilters
    ? peopleDirectory
    : peopleDirectory.filter((person) => {
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

        const locationMatches =
          selectedLocations.length === 0 ||
          selectedLocations.includes(person.location);

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
          locationMatches &&
          managementLevelMatches &&
          companyLocationMatches &&
          companyHeadcountMatches
        );
      });

  const showEmptyState = !hasNoFilters && filteredPeople.length === 0;

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
      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <section aria-labelledby="find-people-filters" className="space-y-4">
          <div>
            <h3 id="find-people-filters" className="text-sm font-medium">
              Filters
            </h3>
            <p className="text-sm">Configure the people search using the filter groups below.</p>
          </div>
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
        </section>

        <section aria-labelledby="find-people-results" className="space-y-4">
          <div>
            <h3 id="find-people-results" className="text-sm font-medium">
              Results Preview
            </h3>
            <p className="text-sm">Preview the mock people matching the selected filters.</p>
          </div>

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
            <label key={option.value} className="flex items-center gap-2 rounded border px-3 py-2 text-sm">
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
