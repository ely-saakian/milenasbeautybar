"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { BookButton } from "./book-button";

interface FillType {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

interface ServiceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Service {
  id: string;
  name: string;
  title: string;
  description: string;
  href: string;
  image: ServiceImage;
  duration: string;
  price: string;
  fillTypes?: FillType[];
}

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggleService(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <div className="grid gap-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isExpanded={expandedId === service.id}
          onToggle={() => toggleService(service.id)}
        />
      ))}
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
}

function ServiceCard({ service, isExpanded, onToggle }: ServiceCardProps) {
  const [selectedFillType, setSelectedFillType] = useState<string>(
    service.fillTypes?.[0]?.id ?? ""
  );

  const hasFillTypes = service.fillTypes && service.fillTypes.length > 0;

  const currentFillType = hasFillTypes
    ? service.fillTypes?.find((f) => f.id === selectedFillType)
    : null;

  return (
    <div
      className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ease-out 
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
                    className="w-full h-full object-cover"
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

                {/* Fill Types Selector */}
                {hasFillTypes && (
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
                      Choose Your Fill Type
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {service.fillTypes?.map((fillType) => (
                        <button
                          key={fillType.id}
                          onClick={() => setSelectedFillType(fillType.id)}
                          className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            selectedFillType === fillType.id
                              ? "bg-[#C4A484] text-white"
                              : "bg-[#F0DED3]/50 text-gray-700 hover:bg-[#F0DED3]"
                          }`}
                        >
                          {fillType.name}
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
                      {currentFillType?.duration ?? service.duration}
                    </p>
                  </div>
                  <div className="p-3 bg-[#F0DED3]/30 rounded-xl">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Price
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {currentFillType?.price ?? service.price}
                    </p>
                  </div>
                </div>

                {/* Fill Type Description */}
                {hasFillTypes && currentFillType && (
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
                      {currentFillType.description}
                    </p>
                  </div>
                )}

                {/* Book Button */}
                {/* <div
                  className={`transition-all duration-500 ease-out ${
                    isExpanded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isExpanded ? "350ms" : "0ms",
                  }}
                > */}
                <BookButton href={service.href} />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
