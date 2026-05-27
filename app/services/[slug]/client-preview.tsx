"use client";

import { useTina } from "tinacms/dist/react";
import type { ServiceQuery } from "@/tina/__generated__/types";
import { flattenService, mapTinaServiceToService } from "@/lib/get-services";
import { CATEGORY_LABELS } from "@/lib/constants";
import { serviceSections } from "@/lib/service-sections";
import { ServicePreviewLayout } from "@/app/components/service-preview-layout";
import { ServiceSection } from "@/app/components/service-section";

interface ClientServicePreviewProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: ServiceQuery;
}

export default function ClientServicePreview(props: ClientServicePreviewProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const tinaService = data.service;
  const service = mapTinaServiceToService(tinaService);
  const flatServices = flattenService(service);
  const categoryLabel =
    CATEGORY_LABELS[tinaService.category] ?? tinaService.category;
  const section = serviceSections.find(
    (s) => s.category === tinaService.category
  );

  return (
    <ServicePreviewLayout category={categoryLabel}>
      {section && <ServiceSection section={section} services={flatServices} />}
    </ServicePreviewLayout>
  );
}
