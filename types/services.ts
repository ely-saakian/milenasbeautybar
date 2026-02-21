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
}

export interface ServiceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Service {
  id: string;
  name: string;
  title: string;
  description: string;
  href: string;
  image: ServiceImage;
  duration: string;
  price: string;
  types?: ServiceType[];
  typesLabel?: string;
}

export interface ServicesByCategory {
  packages: Service[];
  brows: Service[];
  lashes: Service[];
  facialWax: Service[];
}
