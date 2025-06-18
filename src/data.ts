import type { Path } from "./types";

export const NAME_INPUT_DATA = [
  { inputName: "name", inputType: "text" },
  { inputName: "nameInEnglish", inputType: "text" },
  { inputName: "description", inputType: "text" },
  { inputName: "gender", inputType: "text" },
  { inputName: "origin", inputType: "text" },
  { inputName: "slug", inputType: "text" },
  { inputName: "literatureEvidence", inputType: null },
  { inputName: "epigraphEvidence", inputType: null },
  { inputName: "otherNames", inputType: null },
  { inputName: "relatedNames", inputType: null },
  { inputName: "categories", inputType: null },
  { inputName: "tags", inputType: null },
  { inputName: "reference", inputType: null },
  { inputName: "active", inputType: "checkbox" },
];

export const PUBLIC_PATHS: Path[] = [
  { path: "/", name: "Home" },
  { path: "/names", name: "Names" },
];

export const USER_PATHS: Path[] = [
  { path: "/settings", name: "Settings" },
  { path: "/user", name: "User" },
];

export const ADMIN_PATHS: Path[] = [
  { path: "/admin/names", name: "Name Manager" },
  { path: "/admin/tags", name: "Tag Manager" },
  { path: "/admin/categories", name: "Category Manager" },
  { path: "/admin/comments", name: "Comments Manager" },
];
