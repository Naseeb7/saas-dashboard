import type { FilterSection } from "@/types/filters";

export const filterSections: FilterSection[] = [
  {
    id: "job-title",
    title: "Job Title",
    description: "E.g: Manager, Software Engineer",
    filters: [
      {
        id: "job-title",
        label: "Job Title",
        type: "multi-select",
        options: [
          { label: "VP of Marketing", value: "vp of marketing" },
          { label: "Head of Demand Gen", value: "head of demand gen" },
          { label: "Director of Growth", value: "director of growth" },
          { label: "Founder", value: "founder" },
          { label: "Marketing Lead", value: "marketing lead" },
        ],
      },
    ],
  },
  {
    id: "company-website",
    title: "Company Website",
    description: "Eg: Google.com, LinkedIn.com",
    filters: [
      {
        id: "company-website",
        label: "Company Website",
        type: "multi-select",
        options: [
          { label: "northstar.ai", value: "northstar.ai" },
          { label: "lighthouse.co", value: "lighthouse.co" },
          { label: "vertexcloud.com", value: "vertexcloud.com" },
          { label: "orbithealth.com", value: "orbithealth.com" },
          { label: "finflow.in", value: "finflow.in" },
        ],
      },
    ],
  },
  {
    id: "person-location",
    title: "Person Location",
    description: "Eg: London, Great New York City",
    filters: [
      {
        id: "person-location",
        label: "Person Location",
        type: "multi-select",
        options: [
          { label: "San Francisco, USA", value: "San Francisco, USA" },
          { label: "Austin, USA", value: "Austin, USA" },
          { label: "London, UK", value: "London, UK" },
          { label: "Bengaluru, India", value: "Bengaluru, India" },
          { label: "New York, USA", value: "New York, USA" },
        ],
      },
    ],
  },
  {
    id: "company-location",
    title: "Company Location",
    description: "Eg: United States, UAE",
    filters: [
      {
        id: "company-location",
        label: "Company Location",
        type: "multi-select",
        options: [
          { label: "North America", value: "north-america" },
          { label: "Europe", value: "europe" },
          { label: "Asia Pacific", value: "apac" },
          { label: "Middle East", value: "mea" },
        ],
      },
    ],
  },
  {
    id: "company-headcount",
    title: "Company Headcount",
    description: "E.g: 11-50 , 10000+",
    filters: [
      {
        id: "company-headcount",
        label: "Company Headcount",
        type: "multi-select",
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
    id: "management-level",
    title: "Management Level",
    description: "E.g: Owner, Founder",
    filters: [
      {
        id: "management-level",
        label: "Management Level",
        type: "multi-select",
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
];
