import type { User } from "@/types/user";

export type GridActionType = "view" | "edit" | "archive";
export type GridSource =
  | "linkedin"
  | "sales-nav"
  | "website"
  | "csv"
  | "google"
  | "maps"
  | "factors"
  | "hubspot";

export interface GridAction {
  id: string;
  label: string;
  type: GridActionType;
}

export interface GridRowBase {
  id: string;
  name: string;
  editedBy: User;
  lastEditedAt: string;
  source: GridSource;
  isFavorite: boolean;
  actions: GridAction[];
}

export type GridChildItem = GridRowBase;

export interface GridItem extends GridRowBase {
  children?: GridChildItem[];
}
