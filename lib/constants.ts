export const SERVICE_CATEGORY_OPTIONS = [
  { value: "packages", label: "Packages" },
  { value: "brows", label: "Brows" },
  { value: "lashes", label: "Lashes" },
  { value: "facialWax", label: "Facial Wax" },
] as const;

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  SERVICE_CATEGORY_OPTIONS.map((c) => [c.value, c.label])
);
