import client from "@/tina/__generated__/client";
import type { Service, ServicesByCategory } from "@/types/services";

export type FlatService = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  href: string;
  regularPrice?: string;
  tags?: string[];
};

export type FlatServicesByCategory = Record<
  "packages" | "brows" | "lashes" | "facialWax",
  FlatService[]
>;

/** Generate a stable kebab-case id from a display name (e.g. "Deluxe Package" -> "deluxe-package"). */
function toKebabId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface TinaServiceNode {
  id?: string | null;
  category: string;
  name: string;
  description: string;
  href: string;
  duration: string;
  price: string;
  regularPrice?: string | null;
  tags?: Array<string | null> | null;
  order?: number | null;
  typesLabel?: string | null;
  types?: Array<{
    name: string;
    description: string;
    duration: string;
    price: string;
    href?: string | null;
    regularPrice?: string | null;
    tags?: Array<string | null> | null;
  } | null> | null;
}

function normalizeTags(tags?: Array<string | null> | null): string[] | undefined {
  const normalized = tags?.filter((t): t is string => t != null && t.trim() !== "");
  return normalized?.length ? normalized : undefined;
}

export function mapTinaServiceToService(node: TinaServiceNode): Service {
  return {
    id: node.id?.trim() ? node.id : toKebabId(node.name),
    name: node.name,
    description: node.description,
    href: node.href,
    duration: node.duration,
    price: node.price,
    regularPrice: node.regularPrice ?? undefined,
    tags: normalizeTags(node.tags),
    typesLabel: node.typesLabel ?? undefined,
    types: node.types
      ?.filter((t): t is NonNullable<typeof t> => t != null)
      .map((t) => ({
        id: toKebabId(t.name),
        name: t.name,
        description: t.description,
        duration: t.duration,
        price: t.price,
        href: t.href ?? undefined,
        regularPrice: t.regularPrice ?? undefined,
        tags: normalizeTags(t.tags),
      })),
  };
}

export async function getServices(): Promise<ServicesByCategory> {
  const empty: ServicesByCategory = {
    packages: [],
    brows: [],
    lashes: [],
    facialWax: [],
  };

  try {
    const response = await (
      client.queries as {
        serviceConnection?: (vars?: {
          sort?: string;
        }) => Promise<{
          data?: {
            serviceConnection?: {
              edges?: Array<{ node?: TinaServiceNode | null } | null>;
            };
          };
        }>;
      }
    ).serviceConnection?.({ sort: "order" });

    const edges =
      response?.data?.serviceConnection?.edges?.filter(
        (e): e is { node: TinaServiceNode | null } => e != null
      ) ?? [];

    const withOrder = edges
      .map((e) => ({ node: e.node, order: e.node?.order ?? 999 }))
      .filter((x): x is { node: TinaServiceNode; order: number } => x.node != null)
      .sort((a, b) => a.order - b.order);

    const byCategory: ServicesByCategory = {
      packages: [],
      brows: [],
      lashes: [],
      facialWax: [],
    };

    for (const { node } of withOrder) {
      if (!node.category) continue;
      const category = node.category as keyof ServicesByCategory;
      if (!(category in byCategory)) continue;
      byCategory[category].push(mapTinaServiceToService(node));
    }

    return byCategory;
  } catch {
    return empty;
  }
}

/**
 * Flatten a single `Service` into one or more `FlatService` rows. Services
 * with sub-options (`types`) expand into one row per type; otherwise the
 * service passes through as a single row. Drops layout-only fields
 * (`typesLabel`, `types`).
 */
export function flattenService(service: Service): FlatService[] {
  if (service.types?.length) {
    return service.types.map((type) => ({
      id: `${service.id}-${type.id}`,
      name: `${service.name} — ${type.name}`,
      description: type.description,
      duration: type.duration,
      price: type.price,
      href: type.href ?? service.href,
      regularPrice: type.regularPrice,
      tags: type.tags,
    }));
  }
  return [
    {
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      href: service.href,
      regularPrice: service.regularPrice,
      tags: service.tags,
    },
  ];
}

/**
 * Flatten the hierarchical `Service[]` model into a single list per category
 * where each service "type" becomes its own row.
 */
export async function getFlatServices(): Promise<FlatServicesByCategory> {
  const services = await getServices();
  const categories: (keyof ServicesByCategory)[] = [
    "packages",
    "brows",
    "lashes",
    "facialWax",
  ];

  const result: FlatServicesByCategory = {
    packages: [],
    brows: [],
    lashes: [],
    facialWax: [],
  };

  for (const category of categories) {
    result[category] = services[category].flatMap(flattenService);
  }

  return result;
}
