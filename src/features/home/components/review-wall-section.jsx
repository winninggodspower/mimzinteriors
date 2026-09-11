"use client";

import React from "react";
import { Icon } from "@iconify/react";
import ReviewWallCard from "./review-wall-card";
import { reviewWallItems, googleReviewsUrl } from "@features/home/data";

export default function ReviewWallSection() {
  return (
    <section className="relative w-full bg-[#FAF8F4] px-6 py-20 sm:px-8 sm:py-28 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Google 5-Star Trust Badge */}
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white px-4 py-1.5 shadow-2xs transition-transform hover:scale-103"
          >
            <Icon icon="logos:google-icon" className="h-4 w-4" />
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  icon="material-symbols:star-rounded"
                  className="h-4 w-4 text-[#F59E0B]"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-neutral-800">
              5.0 on Google Reviews
            </span>
          </a>

          {/* Section Heading */}
          <h2 className="mt-4 font-caterina text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#161616]">
            Loved by Our Clients
          </h2>

          <p className="mt-3 font-aref-ruqaa text-base sm:text-lg text-neutral-600">
            Real stories, verified feedback, and finished spaces from homeowners
            and businesses across Nigeria.
          </p>

          {/* Google Review CTA Button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md"
            >
              <Icon icon="logos:google-icon" className="h-4 w-4" />
              <span>Drop us a Google review</span>
            </a>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-black"
            >
              <span>View all on Google</span>
              <Icon icon="material-symbols:arrow-outward-rounded" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Responsive Bento Grid (Tablet 2-Col, Desktop 3-Col with 2-Col Spans) */}
        <div className="mt-12 sm:mt-16 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {reviewWallItems.map((item) => (
            <ReviewWallCard key={item.id} item={item} />
          ))}
        </div>

        {/* Mobile 1-Column List (Only 3 Curated Reviews on Mobile) */}
        <div className="mt-10 flex flex-col space-y-4 md:hidden">
          {reviewWallItems
            .filter((item) => !item.isBentoTile)
            .slice(0, 3)
            .map((item) => (
              <ReviewWallCard key={item.id} item={item} />
            ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-[#E8E2D5] bg-white p-6 sm:p-8 text-center shadow-xs">
          <h3 className="font-caterina text-xl sm:text-2xl uppercase text-[#161616]">
            Ready to design a home that lasts a lifetime?
          </h3>
          <p className="mt-1 font-aref-ruqaa text-sm sm:text-base text-neutral-600 max-w-xl">
            Let our award-winning interior design team bring your vision to life.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C28831] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-transform hover:scale-103 hover:bg-[#a67224]"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}
