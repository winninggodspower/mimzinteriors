"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function TestimonialCard({ name, quote, rating = 4 }) {
  return (
    <article className="flex w-full max-w-[350px] items-stretch gap-4 rounded-l-[70px] rounded-tr-[30px] bg-white p-0.5 shadow-sm">
      {/* Left Avatar / Name Badge */}
      <div className="flex size-[86px] shrink-0 flex-col items-center justify-center rounded-full bg-[#D4B391] p-3 text-center text-white">
        {/* Simple User Icon SVG */}
         <Icon icon="healthicons:ui-user-profile" className="text-white text-[15px]" />
        
        <h3 className="mt-2 font-caterina text-[15px] italic leading-tight">
          {name}
        </h3>
      </div>

      {/* Right Content Area */}
      <div className="flex flex-col justify-center py-2 pr-4">
        {/* Quote Text */}
        <p className="font-caterina font-light text-[11px]">
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