"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface ServicePreviewLayoutProps {
  category: string;
  children: React.ReactNode;
}

export function ServicePreviewLayout({
  category,
  children,
}: ServicePreviewLayoutProps) {
  const router = useRouter();

  return (
    <>
      <div className="px-5 py-4 max-w-4xl mx-auto w-full">
        <button
          className="text-gray-500 hover:text-[#C4A484] inline-flex items-center transition-colors"
          onClick={() => router.push("/")}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Back to Home</span>
        </button>
      </div>
      <section className="flex flex-col gap-8 px-4 max-w-4xl mx-auto w-full pb-16">
        <h2 className="text-3xl font-serif font-bold">{category}</h2>
        {children}
      </section>
    </>
  );
}
