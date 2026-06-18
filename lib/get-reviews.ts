import client from "@/tina/__generated__/client";
import type { ServiceCategory } from "@/types/services";
import type { CustomerReview } from "@/types/reviews";

function toKebabId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface TinaCustomerReviewNode {
  customerName: string;
  review: string;
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  serviceCategory: string;
  serviceName: string;
  bookingHref: string;
  order?: number | null;
  published?: boolean | null;
}

function isServiceCategory(value: string): value is ServiceCategory {
  return (
    value === "packages" ||
    value === "brows" ||
    value === "lashes" ||
    value === "facialWax"
  );
}

function isCompleteReview(node: TinaCustomerReviewNode): boolean {
  return (
    Boolean(node.customerName?.trim()) &&
    Boolean(node.review?.trim()) &&
    Boolean(node.beforeImage?.trim()) &&
    Boolean(node.beforeAlt?.trim()) &&
    Boolean(node.afterImage?.trim()) &&
    Boolean(node.afterAlt?.trim()) &&
    isServiceCategory(node.serviceCategory) &&
    Boolean(node.serviceName?.trim()) &&
    Boolean(node.bookingHref?.trim())
  );
}

export function mapTinaReviewToCustomerReview(
  node: TinaCustomerReviewNode,
  filename?: string,
): CustomerReview {
  return {
    id: filename?.trim() ? filename : toKebabId(node.customerName),
    customerName: node.customerName,
    review: node.review,
    beforeImage: node.beforeImage,
    beforeAlt: node.beforeAlt,
    afterImage: node.afterImage,
    afterAlt: node.afterAlt,
    serviceCategory: node.serviceCategory as ServiceCategory,
    serviceName: node.serviceName,
    bookingHref: node.bookingHref,
    order: node.order ?? 999,
  };
}

export async function getFeaturedReviews(
  limit = 3,
): Promise<CustomerReview[]> {
  try {
    const response = await (
      client.queries as {
        customerReviewConnection?: (vars?: {
          sort?: string;
        }) => Promise<{
          data?: {
            customerReviewConnection?: {
              edges?: Array<{
                node?: TinaCustomerReviewNode | null;
              } | null>;
            };
          };
        }>;
      }
    ).customerReviewConnection?.({ sort: "order" });

    const edges =
      response?.data?.customerReviewConnection?.edges?.filter(
        (e): e is { node?: TinaCustomerReviewNode | null } => e != null,
      ) ?? [];

    return edges
      .map((e) => ({ node: e.node }))
      .filter(
        (
          x,
        ): x is { node: TinaCustomerReviewNode & { _sys?: { filename?: string } } } =>
          x.node != null &&
          x.node.published !== false &&
          isCompleteReview(x.node),
      )
      .sort((a, b) => (a.node.order ?? 999) - (b.node.order ?? 999))
      .slice(0, limit)
      .map((x) =>
        mapTinaReviewToCustomerReview(
          x.node,
          (x.node as { _sys?: { filename?: string } })._sys?.filename,
        ),
      );
  } catch {
    return [];
  }
}
