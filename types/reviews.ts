import type { ServiceCategory } from "./services";

export interface CustomerReview {
  id: string;
  customerName: string;
  review: string;
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  serviceCategory: ServiceCategory;
  serviceName: string;
  bookingHref: string;
  order: number;
}
