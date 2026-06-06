import type { User } from "@/types/user";

export type GridActionType = "view" | "edit" | "archive";

export interface GridAction {
  id: string;
  label: string;
  type: GridActionType;
}

export interface GridItem {
  id: string;
  name: string;
  editedBy: User;
  lastEditedAt: string;
  actions: GridAction[];
}
