"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Service } from "@/types/services";
import { BookButton } from "./book-button";

interface ServiceListProps {
  services: Service[];
  defaultExpandedId?: string;
}

interface CollapsingInfo {
  index: number;
  height: number;
}

export function ServiceList({ services, defaultExpandedId }: ServiceListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    defaultExpandedId ?? null
  );
  const [collapsingInfo, setCollapsingInfo] = useState<CollapsingInfo | null>(
    null
  );
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  function setContentRef(id: string, el: HTMLDivElement | null) {
    if (el) {
      contentRefs.current.set(id, el);
    } else {
      contentRefs.current.delete(id);
    }
  }

  function toggleService(id: string) {
    // Before state change, capture the collapsing card's height
    if (expandedId && expandedId !== id) {
      const contentEl = contentRefs.current.get(expandedId);
      const index = services.findIndex((s) => s.id === expandedId);
      if (contentEl && index !== -1) {
        setCollapsingInfo({
          index,
          height: contentEl.offsetHeight,
        });
      }
    } else {
      setCollapsingInfo(null);
    }

    setExpandedId(expandedId === id ? null : id);
  }

  function getCollapsingHeight(serviceIndex: number): number {
    if (!collapsingInfo) return 0;
    // Only return height if collapsing card is above this one
    return collapsingInfo.index < serviceIndex ? collapsingInfo.height : 0;
  }

  return (
    <div className="grid gap-4">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          isExpanded={expandedId === service.id}
          onToggle={() => toggleService(service.id)}
          collapsingHeight={getCollapsingHeight(index)}
          contentRef={(el) => setContentRef(service.id, el)}
        />
      ))}
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
  collapsingHeight: number;
  contentRef: (el: HTMLDivElement | null) => void;
}

function ServiceCard({
  service,
  isExpanded,
  onToggle,
  collapsingHeight,
  contentRef,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<string>(
    service.types?.[0]?.id ?? ""
  );

  const hasTypes = service.types && service.types.length > 0;

  const currentType = hasTypes
    ? service.types?.find((t) => t.id === selectedType)
    : null;

  useLayoutEffect(() => {
    if (isExpanded && cardRef.current) {
      const card = cardRef.current;
      const scrollMargin = 96; // scroll-mt-24 = 96px

      // Calculate target position accounting for collapsing card above
      const cardRect = card.getBoundingClientRect();
      const targetScrollY =
        window.scrollY + cardRect.top - scrollMargin - collapsingHeight;

      requestAnimationFrame(() => {
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
      });
    }
  }, [isExpanded, collapsingHeight]);

  return (
    <div
      ref={cardRef}
      className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ease-out scroll-mt-24
        ${
          isExpanded
            ? "ring-2 ring-[#F0DED3] shadow-lg"
            : "hover:border-[#F0DED3]"
        }
      `}
    >
      {/* Header Button - Always visible, changes appearance based on state */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 md:p-6 flex items-center justify-between cursor-pointer hover:bg-[#F0DED3]/10 transition-colors"
        aria-expanded={isExpanded}
      >
        {/* Collapsed state content */}
        <div
          className={`flex items-center gap-4 grow transition-all duration-300 ${
            isExpanded ? "hidden" : ""
          }`}
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            <Image
              src={service.image.src}
              alt={service.name}
              width={service.image.width}
              height={service.image.height}
              sizes="(min-width: 768px) 128px, 112px"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="grow">
            <h3 className="text-lg md:text-xl font-serif font-semibold text-gray-900">
              {service.name}
            </h3>
            <p className="text-sm md:text-base text-gray-500 mt-0.5">
              {service.price}
            </p>
          </div>
        </div>

        {/* Expanded state title */}
        <h3
          className={`text-xl md:text-2xl font-serif font-bold text-gray-900 grow transition-all duration-300 ${
            isExpanded ? "" : "hidden"
          }`}
        >
          {service.title}
        </h3>

        <ChevronDown
          className={`w-5 h-5 text-[#C4A484] shrink-0 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded View - CSS Grid animation */}
      <div
        ref={contentRef}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-6 pb-5 md:pb-6 pt-4 border-t border-gray-100 bg-gray-50/50">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="md:order-2">
                <div
                  className={`rounded-2xl overflow-hidden h-56 md:h-64 bg-gray-100 transition-all duration-500 ease-out ${
                    isExpanded ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isExpanded ? "100ms" : "0ms",
                  }}
                >
                  <Image
                    src={service.image.src}
                    alt={service.title}
                    width={service.image.width}
                    height={service.image.height}
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="md:order-1 flex flex-col justify-center">
                <p
                  className={`text-gray-600 mb-5 leading-relaxed transition-all duration-500 ease-out ${
                    isExpanded
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isExpanded ? "100ms" : "0ms",
                  }}
                >
                  {service.description}
                </p>

                {/* Types Selector */}
                {hasTypes && (
                  <div
                    className={`mb-5 transition-all duration-500 ease-out ${
                      isExpanded
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isExpanded ? "150ms" : "0ms",
                    }}
                  >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {service.typesLabel ?? "Choose Your Option"}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {service.types?.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            selectedType === type.id
                              ? "bg-[#C4A484] text-white"
                              : "bg-[#F0DED3]/50 text-gray-700 hover:bg-[#F0DED3]"
                          }`}
                        >
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Duration and Price */}
                <div
                  className={`grid grid-cols-2 gap-3 mb-5 transition-all duration-500 ease-out ${
                    isExpanded ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isExpanded ? "200ms" : "0ms",
                  }}
                >
                  <div className="p-3 bg-[#F0DED3]/30 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {currentType?.duration ?? service.duration}
                    </p>
                  </div>
                  <div className="p-3 bg-[#F0DED3]/30 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Price
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {currentType?.price ?? service.price}
                    </p>
                  </div>
                </div>

                {/* Type Description */}
                {hasTypes && currentType && (
                  <div
                    className={`mb-5 p-4 rounded-xl bg-[#F0DED3]/20 border border-[#F0DED3]/40 transition-all duration-500 ease-out ${
                      isExpanded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isExpanded ? "250ms" : "0ms",
                    }}
                  >
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {currentType.description}
                    </p>
                  </div>
                )}

                <BookButton href={currentType?.href ?? service.href} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
