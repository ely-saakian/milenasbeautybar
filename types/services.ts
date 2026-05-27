export type ServiceCategory =
  | "packages"
  | "brows"
  | "lashes"
  | "facialWax";

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  href?: string;
  regularPrice?: string;
  tags?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  href: string;
  duration: string;
  price: string;
  regularPrice?: string;
  tags?: string[];
  types?: ServiceType[];
  typesLabel?: string;
}

export interface ServicesByCategory {
  packages: Service[];
  brows: Service[];
  lashes: Service[];
  facialWax: Service[];
}
