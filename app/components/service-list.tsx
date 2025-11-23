"use client";

import { useState } from "react";
import Image from "next/image";
import { ServiceCard } from "./service-card";

interface Service {
  title: string;
  description: string;
  href: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [imageOpacity, setImageOpacity] = useState<number>(1);

  function handleCardClick(index: number) {
    // Only allow expanding a different service, not collapsing the current one
    if (expandedIndex !== index) {
      // Fade out
      setImageOpacity(0);
      // After fade out completes, change image and fade in
      setTimeout(() => {
        setExpandedIndex(index);
        setImageOpacity(1);
      }, 200);
    }
  }

  const currentService = services[expandedIndex];

  return (
    <div className="flex flex-row gap-8 px-4">
      <div className="flex-1 relative">
        {currentService && (
          <>
            {/* Blurred background glow effect */}
            <Image
              key={`blur-${expandedIndex}`}
              src={currentService.image.src}
              alt=""
              width={currentService.image.width}
              height={currentService.image.height}
              className="rounded-3xl w-full h-auto absolute inset-0 scale-105 blur-2xl opacity-50 transition-opacity duration-300 ease-in-out pointer-events-none"
              style={{ opacity: imageOpacity * 0.5 }}
              aria-hidden="true"
            />
            {/* Main image */}
            <Image
              key={expandedIndex}
              src={currentService.image.src}
              alt={currentService.image.alt}
              width={currentService.image.width}
              height={currentService.image.height}
              className="rounded-3xl w-full h-auto relative z-10 transition-opacity duration-300 ease-in-out"
              style={{ opacity: imageOpacity }}
            />
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            isExpanded={expandedIndex === index}
            title={service.title}
            description={service.description}
            href={service.href}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
