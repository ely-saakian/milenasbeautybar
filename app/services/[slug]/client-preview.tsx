"use client";

import { useTina } from "tinacms/dist/react";
import type { ServiceQuery } from "@/tina/__generated__/types";
import { mapTinaServiceToService } from "@/lib/get-services";
import { CATEGORY_LABELS } from "@/lib/constants";
import { ServicePreviewLayout } from "@/app/components/service-preview-layout";
import { ServiceList } from "@/app/components/service-list";

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
  const categoryLabel =
    CATEGORY_LABELS[tinaService.category] ?? tinaService.category;

  return (
    <ServicePreviewLayout category={categoryLabel}>
      <ServiceList
        services={[service]}
        defaultExpandedId={service.id}
      />
    </ServicePreviewLayout>
  );
}
