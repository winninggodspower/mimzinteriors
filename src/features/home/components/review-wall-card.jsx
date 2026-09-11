"use client";

import React from "react";
import { Icon } from "@iconify/react";

/**
 * Highlights specific substrings within a quote using a warm marker badge.
 */
function renderHighlightedQuote(quote, highlights = []) {
  if (!highlights || highlights.length === 0) {
    return quote;
  }

  const escaped = highlights
    .filter(Boolean)
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (escaped.length === 0) return quote;

  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = quote.split(regex);

  return parts.map((part, index) => {
    const isMatch = highlights.some(
      (h) => h.toLowerCase() === part.toLowerCase()
    );

    if (isMatch) {
      return (
        <mark
          key={index}
          className="rounded-xs bg-[#FDE68A]/80 px-1 py-0.5 font-medium text-neutral-900 not-italic"
        >
          {part}
        </mark>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export default function ReviewWallCard({ item }) {
  // Special Bento Metric / Anchor Tile (Dark High-Contrast)
  if (item.isBentoTile) {
    return (
      <div className="group flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#2A2926] bg-[#181715] p-6 sm:p-7 text-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#42403B] hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="logos:google-icon" className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Google Verified
              </span>
            </div>
            <span className="rounded-full bg-[#C28831]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#D4A359]">
              5.0 Rating
            </span>
          </div>

          <div className="mt-5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  icon="material-symbols:star-rounded"
                  className="h-5 w-5 text-[#F59E0B]"
                />
              ))}
            </div>

            <h3 className="mt-3 font-caterina text-2xl uppercase tracking-wide text-white">
              100% 5-Star Reviews
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-neutral-400 font-normal">
              Trusted by luxury homeowners, developers, and corporate clients across
              Nigeria for timeless spaces and stress-free execution.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-neutral-800 pt-4">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#D4A359] transition-colors hover:text-white"
          >
            <span>Write a review on Google</span>
            <Icon icon="material-symbols:arrow-forward-rounded" className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  const {
    name,
    handle,
    role,
    rating = 5,
    quote,
    highlights = [],
    avatarColor = "bg-[#CEAD8B]",
    link,
    featured = false,
    tag,
  } = item;

  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "M";

  // 2-Column Wide Featured Story Card
  if (featured) {
    const spanClass = item.span || "md:col-span-2 lg:col-span-2";

    return (
      <article className={`group flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4B391] hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)] ${spanClass}`}>
        <div>
          {/* Header Row: 5 Stars + Story Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  icon="material-symbols:star-rounded"
                  className={`h-5 w-5 ${
                    i < rating ? "text-[#F59E0B]" : "text-neutral-200"
                  }`}
                />
              ))}
            </div>

            {tag && (
              <span className="rounded-full bg-[#FAF3EC] border border-[#EADBCC] px-3 py-1 text-[11px] font-semibold text-[#8C6033] uppercase tracking-wider">
                {tag}
              </span>
            )}
          </div>

          {/* Featured Quote with Editorial Stylings */}
          <div className="mt-5 relative">
            <span className="absolute -top-3 -left-1 select-none font-serif text-5xl leading-none text-[#CEAD8B]/25 pointer-events-none">
              &ldquo;
            </span>
            <p className="relative z-10 text-base sm:text-[17px] leading-[1.72] font-normal text-neutral-800 pl-4 border-l-2 border-[#CEAD8B]/40">
              {renderHighlightedQuote(quote, highlights)}
            </p>
          </div>
        </div>

        {/* Reviewer / Google Footer */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-xs ${avatarColor}`}
            >
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold text-neutral-900">
                {name}
              </h4>
              <p className="truncate text-xs text-neutral-500">
                {role || handle}
              </p>
            </div>
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title="Read verified Google review for Mimz Interiors"
            aria-label={`Read ${name}'s verified Google review for Mimz Interiors`}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
          >
            <Icon icon="logos:google-icon" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-[11px]">Verified Review</span>
          </a>
        </div>
      </article>
    );
  }

  // Standard 1-Column Review Card
  return (
    <article className="group flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)] col-span-1">
      <div>
        {/* 5 Gold Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              icon="material-symbols:star-rounded"
              className={`h-4.5 w-4.5 ${
                i < rating ? "text-[#F59E0B]" : "text-neutral-200"
              }`}
            />
          ))}
        </div>

        {/* Review Quote Body */}
        <p className="mt-3.5 text-[14px] leading-[1.68] font-normal text-neutral-800">
          {renderHighlightedQuote(quote, highlights)}
        </p>
      </div>

      {/* Reviewer / Google Footer */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-100 pt-3.5">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar Initials Badge */}
          <div
            className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white shadow-xs ${avatarColor}`}
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-[13px] font-semibold text-neutral-900">
              {name}
            </h4>
            <p className="truncate text-[11px] text-neutral-500">
              {role || handle}
            </p>
          </div>
        </div>

        {/* Google Business Icon & Link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title="Read verified Google review for Mimz Interiors"
          aria-label={`Read ${name}'s verified Google review for Mimz Interiors`}
          className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 transition-all hover:bg-neutral-100 hover:scale-110"
        >
          <Icon icon="logos:google-icon" className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
