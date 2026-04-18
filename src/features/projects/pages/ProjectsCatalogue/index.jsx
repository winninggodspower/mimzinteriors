"use client";

import Image from "next/image";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import projectHero from "@assets/images/projects/projectsCatalogue/projectscataloguehero.png";
import seperator from "@assets/images/seperator.png";
import {
  aosReveal,
  heroScaleLoop,
  sectionReveal,
} from "@features/lib/motion";
import { getProjectsCataloguePage } from "@/projects/projectCatalogue/actions";
import {
  PROJECTS_CATALOGUE_PAGE_SIZE,
  projectsCatalogueQueryKey,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import { useProjectsCataloguePagination } from "./useProjectsCataloguePagination";

export default function ProjectsCatalogue() {
  const { page, updatePageInUrl } = useProjectsCataloguePagination();

  const sectionMotion = sectionReveal();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: projectsCatalogueQueryKey(page, PROJECTS_CATALOGUE_PAGE_SIZE),
    queryFn: () =>
      getProjectsCataloguePage({
        page,
        limit: PROJECTS_CATALOGUE_PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / PROJECTS_CATALOGUE_PAGE_SIZE) || 1;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;
  const showLoadingOverlay = isLoading || isFetching;

  return (
    <main className="prjc-main">
      <motion.section className="prjc-hero" {...sectionMotion}>
        <div className="prjc-hero-wrap">
          <motion.div
            {...heroScaleLoop({ scale: 1.04 })}
            className="h-full w-full"
          >
            <Image
              src={projectHero}
              alt="Project catalogue hero"
              fill
              priority
              className="prjc-hero-img"
              sizes="100vw"
            />
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="prjc-intro" {...sectionMotion}>
        <motion.p className="prjc-img-credit" {...aosReveal({ direction: "left", distance: 30, duration: 0.48 })}>-All images belongs to Mimz interiors-</motion.p>
        <motion.h1 className="prjc-title" {...aosReveal({ direction: "right", distance: 52, duration: 0.62 })}>PROJECT CATALOG</motion.h1>
        <motion.p className="prjc-intro-copy" {...aosReveal({ direction: "left", distance: 44, duration: 0.62 })}>
          Our project speaks loudly for itself as we handle them with the highest form of professionalism from field workers to our customer care services. All process documentation and alignments are done with modern tools to give a remarkable impression at the beginning and end of every project. At Mimz interior, we give every client a reason to come back.
        </motion.p>
      </motion.section>

      <motion.section className="prjc-gallery-section" {...sectionMotion}>
        <div className="relative min-h-[clamp(320px,42vw,620px)]">
          <div className="prjc-gallery-grid">
            {data?.projects?.map((project) => (
              <article key={project.id} className="prjc-card">
                <Link
                  href={`/projects/project_catalogue/${project.id}`}
                  className="prjc-card-image-wrap group"
                  aria-label={project.title}
                >
                  <Image
                    src={project.profileImage}
                    alt={project.title}
                    fill
                    className="prjc-card-image"
                    sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                    <h3 className="font-caterina text-[48px] leading-none font-light uppercase text-white max-md:text-[34px] max-sm:text-[26px]">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-[32ch] text-[18px] leading-[1.15] text-white/95 max-md:text-[15px] max-sm:text-[13px]">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {showLoadingOverlay ? (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center bg-white/75 px-4 backdrop-blur-sm"
              role="status"
              aria-live="polite"
              aria-label="Loading projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center gap-4 border border-[rgba(194,172,132,0.28)] bg-[rgba(255,252,247,0.84)] px-6 py-5 shadow-[0_18px_50px_rgba(40,32,20,0.12)] max-sm:px-5 max-sm:py-4">
                <span
                  className="h-12 w-12 animate-spin rounded-full border-2 border-[rgba(28,28,26,0.12)] border-t-[#c9a96e] border-r-[rgba(201,169,110,0.55)]"
                  aria-hidden="true"
                />
                <p className="m-0 font-caterina text-[clamp(1rem,1.4vw,1.25rem)] uppercase tracking-[0.08em] text-[#2b2720]">
                  Loading projects...
                </p>
              </div>
            </motion.div>
          ) : null}
        </div>

        <div className="prjc-pagination-wrap">
          <button
            type="button"
            className="prjc-page-btn"
            disabled={!canGoPrev || isFetching}
            onClick={() => updatePageInUrl(page - 1, totalPages)}
          >
            &lt; Previous
          </button>

          <button
            type="button"
            className="prjc-page-btn"
            disabled={!canGoNext || isFetching}
            onClick={() => updatePageInUrl(page + 1, totalPages)}
          >
            Next &gt;
          </button>
        </div>
      </motion.section>

      <motion.section className="prjc-quote" {...sectionMotion}>
        <div className="prjc-quote-inner">
          <motion.blockquote {...aosReveal({ direction: "right", distance: 56, duration: 0.66 })}>
            We design and create spaces from residential homes to office spaces with a focus on functionality and aesthetic appeal. We are never out of style.
          </motion.blockquote>
          <div className="prjc-separator-wrap" aria-hidden="true">
            <Image
              src={seperator}
              alt=""
              fill
              className="prjc-separator-img"
              sizes="(min-width: 1024px) 190px, 40vw"
            />
          </div>
        </div>
      </motion.section>
    </main>
  );
}