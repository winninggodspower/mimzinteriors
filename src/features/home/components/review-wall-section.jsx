"use client";

import React from "react";
import { Icon } from "@iconify/react";
import ReviewWallCard from "./review-wall-card";
import { reviewWallItems, googleReviewsUrl } from "@features/home/data";

export default function ReviewWallSection() {
  // Curated Bento Layout: 3 balanced, symmetrical columns
  const col1 = reviewWallItems.slice(0, 2); // Left: Handover Milestone Image + Review
  const col2 = reviewWallItems.slice(2, 5); // Center: Review + Dark Bento Google Tile + Review
  const col3 = reviewWallItems.slice(5, 7); // Right: Apartment Reveal Image + Review

  // Tablet 2-column distribution
  const tabletCol1 = [reviewWallItems[0], reviewWallItems[1], reviewWallItems[2]];
  const tabletCol2 = [reviewWallItems[3], reviewWallItems[4], reviewWallItems[5], reviewWallItems[6]];

  return (
    <section className="relative w-full bg-[#FAF8F4] py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        {/* Desktop 3-Column Bento Grid: Symmetrical & Curated */}
        <div className="mt-12 sm:mt-16 hidden lg:grid lg:grid-cols-3 gap-5 items-start">
          {/* Left Column: Image Showcase + Client Review */}
          <div className="flex flex-col">
            {col1.map((item) => (
              <ReviewWallCard key={item.id} item={item} />
            ))}
          </div>

          {/* Center Column: Review + Dark Bento Google Tile + Review */}
          <div className="flex flex-col">
            {col2.map((item) => (
              <ReviewWallCard key={item.id} item={item} />
            ))}
          </div>

          {/* Right Column: Image Showcase + Client Review */}
          <div className="flex flex-col">
            {col3.map((item) => (
              <ReviewWallCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Tablet 2-Column Grid */}
        <div className="mt-12 hidden md:grid lg:hidden md:grid-cols-2 gap-5 items-start">
          <div className="flex flex-col">
            {tabletCol1.map((item) => (
              <ReviewWallCard key={item.id} item={item} />
            ))}
          </div>
          <div className="flex flex-col">
            {tabletCol2.map((item) => (
              <ReviewWallCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Mobile 1-Column Grid */}
        <div className="mt-10 grid grid-cols-1 md:hidden gap-4">
          {reviewWallItems.map((item) => (
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
