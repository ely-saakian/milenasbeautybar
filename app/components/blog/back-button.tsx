"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <div className="px-5 py-4 max-w-4xl mx-auto w-full">
      <button
        className="text-gray-500 hover:text-[#C4A484] inline-flex items-center transition-colors"
        onClick={() => router.push("/blog")}
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        <span>Back to Blog</span>
      </button>
    </div>
  );
}
