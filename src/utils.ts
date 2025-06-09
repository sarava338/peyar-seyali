export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}


export function toArray(str: string, delimeter: string) {
  return str
    .split(delimeter)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}