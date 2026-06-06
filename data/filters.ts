import type { FilterSection } from "@/types/filters";

export const filterSections: FilterSection[] = [
  {
    id: "role-fit",
    title: "Role fit",
    description: "Define the people you want to reach.",
    filters: [
      {
        id: "job-title",
        label: "Job Title",
        type: "text",
        placeholder: "Search by title",
      },
      {
        id: "management-level",
        label: "Management Level",
        type: "select",
        options: [
          { label: "Individual Contributor", value: "ic" },
          { label: "Manager", value: "manager" },
          { label: "Director", value: "director" },
          { label: "VP", value: "vp" },
          { label: "C-Level", value: "c-level" },
        ],
      },
    ],
  },
  {
    id: "company-profile",
    title: "Company profile",
    description: "Filter by company attributes.",
    filters: [
      {
        id: "company-website",
        label: "Company Website",
        type: "text",
        placeholder: "Enter a domain",
      },
      {
        id: "company-location",
        label: "Company Location",
        type: "select",
        options: [
          { label: "North America", value: "north-america" },
          { label: "Europe", value: "europe" },
          { label: "Asia Pacific", value: "apac" },
          { label: "Middle East", value: "mea" },
        ],
      },
      {
        id: "company-headcount",
        label: "Company Headcount",
        type: "select",
        options: [
          { label: "1-10", value: "1-10" },
          { label: "11-50", value: "11-50" },
          { label: "51-200", value: "51-200" },
          { label: "201-500", value: "201-500" },
          { label: "500+", value: "500-plus" },
        ],
      },
    ],
  },
  {
    id: "location-targeting",
    title: "Location targeting",
    description: "Narrow by person geography.",
    filters: [
      {
        id: "person-location",
        label: "Person Location",
        type: "multi-select",
        options: [
          { label: "San Francisco, USA", value: "san-francisco" },
          { label: "Austin, USA", value: "austin" },
          { label: "London, UK", value: "london" },
          { label: "Bengaluru, India", value: "bengaluru" },
          { label: "New York, USA", value: "new-york" },
        ],
      },
    ],
  },
];
