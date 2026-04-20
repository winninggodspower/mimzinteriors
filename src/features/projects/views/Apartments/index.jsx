"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import projectHero from "@assets/images/projects/projectsCatalogue/projectscataloguehero.png";
import seperator from "@assets/images/seperator.png";
import {
  aosReveal,
  MOTION_STAGGER,
  MOTION_DURATIONS,
  fadeUpItem,
  heroScaleLoop,
  sectionReveal,
  staggerContainer,
} from "@features/lib/motion";
import { useApartmentsPagination } from "./useApartmentsPagination";

export default function ApartmentsPage() {
  const {
    page,
    data,
    isLoading,
    isPageChangePending,
    totalPages,
    canGoPrev,
    canGoNext,
    updatePageInUrl,
    apartmentsSectionRef,
  } = useApartmentsPagination();

  const sectionMotion = sectionReveal();
  const cardContainer = staggerContainer(MOTION_STAGGER.tight);
  const cardItem = fadeUpItem({ duration: MOTION_DURATIONS.cardFast });

  return (
    <main className="aptc-main">
      <motion.section className="aptc-hero" {...sectionMotion}>
        <div className="aptc-hero-wrap">
          <motion.div
            {...heroScaleLoop({ scale: 1.04 })}
            className="h-full w-full"
          >
            <Image
              src={projectHero}
              alt="Apartments catalogue hero"
              fill
              priority
              className="aptc-hero-img"
              sizes="100vw"
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="aptc-intro" {...sectionMotion}>
        <motion.p className="aptc-img-credit" {...aosReveal({ direction: "left", distance: 30, duration: 0.48 })}>-All images belongs to Mimz interiors-</motion.p>
        <motion.h1 className="aptc-title" {...aosReveal({ direction: "right", distance: 52, duration: 0.62 })}>APARTMENTS CATALOG</motion.h1>
        <motion.p className="aptc-intro-copy" {...aosReveal({ direction: "left", distance: 44, duration: 0.62 })}>
          Our project speaks loudly for itself as we handle them with the highest form of professionalism from field workers to our customer care services. All process documentation and alignments are done with modern tools to give a remarkable impression at the beginning and end of every project. At Mimz interior, we give every client a reason to come back.
        </motion.p>
      </motion.section>

      <motion.section className="aptc-gallery-section" ref={apartmentsSectionRef} {...sectionMotion}>
        {isLoading ? (
          <div className="aptc-loading">Loading apartments...</div>
        ) : (
          <motion.div
            className="aptc-gallery-grid"
            variants={cardContainer}
            initial="hidden"
            animate="visible"
          >
            {data?.apartments?.map((apartment) => (
              <motion.article
                key={apartment.id}
                className="aptc-card"
                variants={cardItem}
              >
                <Link
                  href={`/projects/apartments/${apartment.id}`}
                  className="aptc-card-image-wrap group"
                  aria-label={apartment.title}
                >
                  <Image
                    src={apartment.profileImage}
                    alt={apartment.title}
                    fill
                    className="aptc-card-image"
                    sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                    <h3 className="font-caterina text-[48px] leading-none font-light uppercase text-white max-md:text-[34px] max-sm:text-[26px]">
                      {apartment.title}
                    </h3>
                    <p className="mt-2 max-w-[32ch] text-[18px] leading-[1.15] text-white/95 max-md:text-[15px] max-sm:text-[13px]">
                      {apartment.description}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        <div className="mimz-pagination-wrap">
          <button
            type="button"
            className="mimz-pagination-btn"
            disabled={!canGoPrev || isPageChangePending}
            onClick={() => updatePageInUrl(page - 1, totalPages)}
          >
            &lt; Previous
          </button>

          <button
            type="button"
            className="mimz-pagination-btn"
            disabled={!canGoNext || isPageChangePending}
            onClick={() => updatePageInUrl(page + 1, totalPages)}
          >
            Next &gt;
          </button>
        </div>
      </motion.section>

      <motion.section className="aptc-quote" {...sectionMotion}>
        <div className="aptc-quote-inner">
          <motion.blockquote {...aosReveal({ direction: "right", distance: 56, duration: 0.66 })}>
            We design and create spaces from residential homes to office spaces with a focus on functionality and aesthetic appeal. We are never out of style.
          </motion.blockquote>
          <div className="aptc-separator-wrap" aria-hidden="true">
            <Image
              src={seperator}
              alt=""
              fill
              className="aptc-separator-img"
              sizes="(min-width: 1024px) 190px, 40vw"
            />
          </div>
        </div>
      </motion.section>
    </main>
  );
}