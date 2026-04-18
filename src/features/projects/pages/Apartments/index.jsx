"use client";

import Image from "next/image";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
import { getApartmentsCataloguePage } from "../../../app/projects/apartments/actions";
import {
  APARTMENTS_CATALOGUE_PAGE_SIZE,
  apartmentsCatalogueQueryKey,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import { useApartmentsPagination } from "./useApartmentsPagination";

export default function ApartmentsPage() {
  const { page, updatePageInUrl, apartmentsSectionRef } = useApartmentsPagination();

  const sectionMotion = sectionReveal();
  const cardContainer = staggerContainer(MOTION_STAGGER.tight);
  const cardItem = fadeUpItem({ duration: MOTION_DURATIONS.cardFast });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: apartmentsCatalogueQueryKey(page, APARTMENTS_CATALOGUE_PAGE_SIZE),
    queryFn: () =>
      getApartmentsCataloguePage({
        page,
        limit: APARTMENTS_CATALOGUE_PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / APARTMENTS_CATALOGUE_PAGE_SIZE) || 1;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

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
                  className="aptc-card-image-wrap"
                  aria-label={apartment.title}
                >
                  <Image
                    src={apartment.profileImage}
                    alt={apartment.title}
                    fill
                    className="aptc-card-image"
                    sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <span className="aptc-card-overlay-title">{apartment.title}</span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        <div className="aptc-pagination-wrap">
          <button
            type="button"
            className="aptc-page-btn"
            disabled={!canGoPrev || isFetching}
            onClick={() => updatePageInUrl(page - 1, totalPages)}
          >
            &lt; Previous
          </button>

          <button
            type="button"
            className="aptc-page-btn"
            disabled={!canGoNext || isFetching}
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