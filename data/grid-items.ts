import type { GridItem } from "@/types/grid";
import { teamMembers } from "@/data/users";

export const gridItems: GridItem[] = [
  {
    id: "grid-001",
    name: "Website audit leads",
    editedBy: teamMembers[0],
    lastEditedAt: "2026-06-05T14:20:00Z",
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
    id: "grid-002",
    name: "Q2 outreach shortlist",
    editedBy: teamMembers[1],
    lastEditedAt: "2026-06-04T09:45:00Z",
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
    id: "grid-003",
    name: "Competitive accounts",
    editedBy: teamMembers[2],
    lastEditedAt: "2026-06-03T18:10:00Z",
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
    id: "grid-004",
    name: "Warm intro targets",
    editedBy: teamMembers[3],
    lastEditedAt: "2026-06-02T11:05:00Z",
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
];
