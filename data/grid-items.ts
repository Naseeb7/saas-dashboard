import type { GridItem } from "@/types/grid";
import { teamMembers } from "@/data/users";

export const gridItems: GridItem[] = [
  {
    id: "grid-001",
    name: "Website audit leads",
    editedBy: teamMembers[0],
    lastEditedAt: "2026-06-05T14:20:00Z",
    source: "hubspot",
    isFavorite: false,
    actions: [
      {
        id: "view",
        label: "View",
        type: "view",
      },
      {
        id: "edit",
        label: "Edit",
        type: "edit",
      },
    ],
    children: [
      {
        id: "grid-001-a",
        name: "Homepage crawl notes",
        editedBy: teamMembers[1],
        lastEditedAt: "2026-06-05T15:05:00Z",
        source: "website",
        isFavorite: true,
        actions: [
          {
            id: "view",
            label: "View",
            type: "view",
          },
          {
            id: "edit",
            label: "Edit",
            type: "edit",
          },
        ],
      },
      {
        id: "grid-001-b",
        name: "Pricing page signals",
        editedBy: teamMembers[2],
        lastEditedAt: "2026-06-05T15:18:00Z",
        source: "linkedin",
        isFavorite: false,
        actions: [
          {
            id: "view",
            label: "View",
            type: "view",
          },
          {
            id: "archive",
            label: "Archive",
            type: "archive",
          },
        ],
      },
      {
        id: "grid-001-c",
        name: "Signup flow observations",
        editedBy: teamMembers[3],
        lastEditedAt: "2026-06-05T15:32:00Z",
        source: "google",
        isFavorite: false,
        actions: [
          {
            id: "view",
            label: "View",
            type: "view",
          },
          {
            id: "edit",
            label: "Edit",
            type: "edit",
          },
        ],
      },
    ],
  },
  {
    id: "grid-002",
    name: "Q2 outreach shortlist",
    editedBy: teamMembers[1],
    lastEditedAt: "2026-06-04T09:45:00Z",
    source: "linkedin",
    isFavorite: false,
    actions: [
      {
        id: "view",
        label: "View",
        type: "view",
      },
      {
        id: "archive",
        label: "Archive",
        type: "archive",
      },
    ],
    children: [
      {
        id: "grid-002-a",
        name: "Priority account list",
        editedBy: teamMembers[0],
        lastEditedAt: "2026-06-04T10:20:00Z",
        source: "sales-nav",
        isFavorite: true,
        actions: [
          {
            id: "view",
            label: "View",
            type: "view",
          },
          {
            id: "edit",
            label: "Edit",
            type: "edit",
          },
        ],
      },
      {
        id: "grid-002-b",
        name: "Warm intro pipeline",
        editedBy: teamMembers[1],
        lastEditedAt: "2026-06-04T10:42:00Z",
        source: "hubspot",
        isFavorite: false,
        actions: [
          {
            id: "view",
            label: "View",
            type: "view",
          },
          {
            id: "archive",
            label: "Archive",
            type: "archive",
          },
        ],
      },
    ],
  },
  {
    id: "grid-003",
    name: "Competitive accounts",
    editedBy: teamMembers[2],
    lastEditedAt: "2026-06-03T18:10:00Z",
    source: "website",
    isFavorite: true,
    actions: [
      {
        id: "view",
        label: "View",
        type: "view",
      },
      {
        id: "edit",
        label: "Edit",
        type: "edit",
      },
    ],
    children: [
      {
        id: "grid-003-a",
        name: "Competitor backlinks",
        editedBy: teamMembers[2],
        lastEditedAt: "2026-06-03T18:52:00Z",
        source: "website",
        isFavorite: true,
        actions: [
          {
            id: "view",
            label: "View",
            type: "view",
          },
          {
            id: "archive",
            label: "Archive",
            type: "archive",
          },
        ],
      },
    ],
  },
  {
    id: "grid-004",
    name: "Warm intro targets",
    editedBy: teamMembers[3],
    lastEditedAt: "2026-06-02T11:05:00Z",
    source: "csv",
    isFavorite: false,
    actions: [
      {
        id: "view",
        label: "View",
        type: "view",
      },
      {
        id: "archive",
        label: "Archive",
        type: "archive",
      },
    ],
  },
  {
    id: "grid-005",
    name: "Google maps leads",
    editedBy: teamMembers[1],
    lastEditedAt: "2026-06-01T10:12:00Z",
    source: "maps",
    isFavorite: true,
    actions: [
      { id: "view", label: "View", type: "view" },
      { id: "edit", label: "Edit", type: "edit" },
    ],
  },
  {
    id: "grid-006",
    name: "Sales nav export",
    editedBy: teamMembers[2],
    lastEditedAt: "2026-05-31T16:45:00Z",
    source: "sales-nav",
    isFavorite: false,
    actions: [
      { id: "view", label: "View", type: "view" },
      { id: "archive", label: "Archive", type: "archive" },
    ],
  },
  {
    id: "grid-007",
    name: "Google search results",
    editedBy: teamMembers[0],
    lastEditedAt: "2026-05-30T08:30:00Z",
    source: "google",
    isFavorite: false,
    actions: [
      { id: "view", label: "View", type: "view" },
      { id: "edit", label: "Edit", type: "edit" },
    ],
  },
  {
    id: "grid-008",
    name: "Factors shortlist",
    editedBy: teamMembers[3],
    lastEditedAt: "2026-05-29T13:55:00Z",
    source: "factors",
    isFavorite: true,
    actions: [
      { id: "view", label: "View", type: "view" },
      { id: "archive", label: "Archive", type: "archive" },
    ],
  },
  {
    id: "grid-009",
    name: "LinkedIn prospect list",
    editedBy: teamMembers[1],
    lastEditedAt: "2026-05-28T17:20:00Z",
    source: "linkedin",
    isFavorite: false,
    actions: [
      { id: "view", label: "View", type: "view" },
      { id: "edit", label: "Edit", type: "edit" },
    ],
  },
  {
    id: "grid-010",
    name: "HubSpot list",
    editedBy: teamMembers[2],
    lastEditedAt: "2026-05-27T09:15:00Z",
    source: "hubspot",
    isFavorite: true,
    actions: [
      { id: "view", label: "View", type: "view" },
      { id: "archive", label: "Archive", type: "archive" },
    ],
  },
];
