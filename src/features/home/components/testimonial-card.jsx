"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function TestimonialCard({ name, quote, rating = 4 }) {
  return (
    <article className="flex w-[min(88vw,360px)] items-center gap-3 rounded-l-[70px] rounded-tr-[30px] bg-white p-1 shadow-sm">
      {/* Left Avatar / Name Badge */}
      <div className="flex size-19.5 shrink-0 flex-col items-center justify-center rounded-full bg-[#D4B391] p-2 text-center text-white">
        {/* Simple User Icon SVG */}
         <Icon icon="healthicons:ui-user-profile" className="text-white text-[15px]" />
        
        <h3 className="mt-1 font-caterina text-[14px] italic leading-tight">
          {name}
        </h3>
      </div>

      {/* Right Content Area */}
      <div className="min-w-0 flex-1 py-1 pr-1">
        {/* Quote Text */}
        <p className="line-clamp-3 font-caterina font-light text-[11px]">
          {quote}
        </p>

        {/* Star Rating Section */}
        <div className=" flex items-center gap-0.5">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`h-3.5 w-3.5 ${
                index < rating ? "text-[#D4B391] fill-[#D4B391]" : "text-[#D4B391] fill-transparent"
              }`}
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499c.173-.434.767-.434.94 0l3.01 6.115 6.744.98a.53.53 0 01.305.904l-4.88 4.755 1.152 6.716a.53.53 0 01-.77.56L12 20.118l-6.03 3.173a.53.53 0 01-.77-.56l1.152-6.716-4.88-4.755a.53.53 0 01.305-.904l6.744-.98 3.01-6.115z"
              />
            </svg>
          ))}
        </div>
      </div>
    </article>
  );
}