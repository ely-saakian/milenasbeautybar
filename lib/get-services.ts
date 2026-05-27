import client from "@/tina/__generated__/client";
import type { Service, ServicesByCategory } from "@/types/services";

export type FlatService = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  href: string;
};

export type FlatServicesByCategory = Record<
  "packages" | "brows" | "lashes" | "facialWax",
  FlatService[]
>;

const IMAGE_WIDTH = 523;
const IMAGE_HEIGHT = 364;

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
  title: string;
  description: string;
  href: string;
  image?: string | null;
  imageAlt: string;
  duration: string;
  price: string;
  order?: number | null;
  typesLabel?: string | null;
  types?: Array<{
    name: string;
    description: string;
    duration: string;
    price: string;
    href?: string | null;
  } | null> | null;
}

export function mapTinaServiceToService(node: TinaServiceNode): Service {
  const imageSrc =
    typeof node.image === "string" ? node.image : node.image ?? "";
  return {
    id: node.id?.trim() ? node.id : toKebabId(node.name),
    name: node.name,
    title: node.title,
    description: node.description,
    href: node.href,
    image: {
      src:
        imageSrc.startsWith("/") || imageSrc.startsWith("http")
          ? imageSrc
          : `/${imageSrc}`,
      alt: node.imageAlt,
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
    },
    duration: node.duration,
    price: node.price,
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
 * Flatten the hierarchical `Service[]` model into a single list per category
 * where each service "type" becomes its own row. Services without `types`
 * pass through as a single row. Drops layout-only fields (`title`, `image`,
 * `typesLabel`, `types`).
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
    const flat: FlatService[] = [];
    for (const service of services[category]) {
      if (service.types?.length) {
        for (const type of service.types) {
          flat.push({
            id: `${service.id}-${type.id}`,
            name: `${service.name} — ${type.name}`,
            description: type.description,
            duration: type.duration,
            price: type.price,
            href: type.href ?? service.href,
          });
        }
      } else {
        flat.push({
          id: service.id,
          name: service.name,
          description: service.description,
          duration: service.duration,
          price: service.price,
          href: service.href,
        });
      }
    }
    result[category] = flat;
  }

  return result;
}
