"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import projectHero from "@assets/images/projects/projectsCatalogue/projectscataloguehero.png";
import seperator from "@assets/images/seperator.png";
import {
  fadeUpItem,
  heroScaleLoop,
  staggerContainer,
} from "@features/lib/motion";
import { useProjectsByTagPagination } from "./useProjectsByTagPagination";
import HeroCardsStrip from "@features/home/components/hero-cards-strip";
import QuoteSection from "@features/about/components/quote-section";

const TAG_QUOTES = {
  home: "The essence of interior design will always be about people and how they live.",
  office: "The space you work in should work for you.",
  hotel: "Hospitality is making your guests feel at home, even when you wish they were.",
};

const TAG_PLURALS = {
  home: "HOMES",
  office: "OFFICES",
  hotel: "HOTELS",
};

export default function ProjectsByTagPage() {
  const {
    tag: activeTag,
    page,
    data,
    totalPages,
    canGoPrev,
    canGoNext,
    showLoadingOverlay,
    isPageChangePending,
    updateTag,
    updatePageInUrl,
    galleryRef,
  } = useProjectsByTagPagination();

  const introMotion = staggerContainer(0.1);
  const quoteMotion = fadeUpItem({ y: 20, duration: 0.62 });
  const projectCount = data?.projects?.length || 0;
  const tagQuote = TAG_QUOTES[activeTag] || TAG_QUOTES.home;
  const tagHeading = TAG_PLURALS[activeTag] || "PROJECT CATALOGUE";

  return (
    <main className="prjc-main overflow-x-visible">
      <section className="relative w-full overflow-visible bg-white pb-16">
        <div className="relative w-full overflow-visible h-125 sm:h-150 lg:h-175">
          <motion.div
            {...heroScaleLoop({ scale: 1.04 })}
            className="absolute inset-0 overflow-hidden"
          >
            <Image
              src={projectHero}
              alt="Project catalogue hero"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
          <h1 className="hero-title">PROJECTS</h1>

          <HeroCardsStrip activeTag={activeTag} onCardClick={updateTag} />
        </div>
      </section>

      <section className="prjc-intro">
        <motion.div
          variants={introMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.p
            className="prjc-img-credit"
            variants={fadeUpItem({ y: 14, duration: 0.5 })}
          >
            -All images belongs to Mimz interiors-
          </motion.p>
          <motion.h1
            className="mt-[clamp(2rem,4vw,3rem)] font-caterina text-[40px] leading-none font-light uppercase text-black max-md:text-[clamp(2rem,4vw,3rem)]"
            variants={fadeUpItem({ y: 16, duration: 0.58, delay: 0.06 })}
          >
            {tagHeading}
          </motion.h1>
          <motion.p
            className="prjc-intro-copy"
            variants={fadeUpItem({ y: 16, duration: 0.62, delay: 0.12 })}
          >
            Our project speaks loudly for itself as we handle them with the highest form of professionalism from field workers to our customer care services. All process documentation and alignments are done with modern tools to give a remarkable impression at the beginning and end of every project. At Mimz interior, we give every client a reason to come back.
          </motion.p>
        </motion.div>
      </section>

      <section className="bg-white px-4 md:px-8 lg:px-12.5" ref={galleryRef}>
        <div className="relative pb-10">
          {projectCount > 0 ? (
            <div className="prjc-gallery-grid">
              {data?.projects?.map((project) => (
                <motion.article
                  key={project.id}
                  className="prjc-card"
                  variants={fadeUpItem({ y: 24, duration: 0.58 })}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
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
                </motion.article>
              ))}
            </div>
          ) : showLoadingOverlay ? null : (
            <div className="flex items-center justify-center px-4 pt-[clamp(1.5rem,3vw,2.5rem)] text-center">
              <motion.div
                className="max-w-xl rounded-3xl border border-[rgba(194,172,132,0.24)] bg-[rgba(255,252,247,0.92)] px-6 py-10 shadow-[0_18px_50px_rgba(40,32,20,0.08)]"
                variants={fadeUpItem({ y: 18, duration: 0.58 })}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <p className="font-caterina text-[clamp(1.2rem,2vw,1.7rem)] uppercase tracking-[0.08em] text-[#2b2720]">
                  No projects available yet
                </p>
                <p className="mt-3 text-[15px] leading-6 text-[#6f655a]">
                  We&rsquo;re currently updating the catalogue. Please check back soon for new projects.
                </p>
              </motion.div>
            </div>
          )}

          {showLoadingOverlay ? (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center bg-white/75 px-4 backdrop-blur-sm"
              role="status"
              aria-live="polite"
              aria-label="Loading projects"
            >
              <div className="flex flex-col items-center gap-4 px-6 py-5 max-sm:px-5 max-sm:py-4">
                <span
                  className="h-12 w-12 animate-spin rounded-full border-2 border-[rgba(28,28,26,0.12)] border-t-[#c9a96e] border-r-[rgba(201,169,110,0.55)]"
                  aria-hidden="true"
                />
                <p className="m-0 font-caterina text-[clamp(1rem,1.4vw,1.25rem)] uppercase tracking-[0.08em] text-[#2b2720]">
                  Loading projects...
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {projectCount > 0 ? (
          <div className="mimz-pagination-wrap">
            <button
              type="button"
              className="mimz-pagination-btn"
              disabled={!canGoPrev || isPageChangePending}
              onClick={() => updatePageInUrl(page - 1, totalPages)}
            >
              {"<"} Previous
            </button>

            <button
              type="button"
              className="mimz-pagination-btn"
              disabled={!canGoNext || isPageChangePending}
              onClick={() => updatePageInUrl(page + 1, totalPages)}
            >
              Next {">"}
            </button>
          </div>
        ) : null}
      </section>
      
      <QuoteSection
        text={tagQuote}
        className="pb-[clamp(4.8rem,9vw,8rem)] pt-[clamp(3.8rem,8vw,5.8rem)] max-w-6xl!"
        textClassName="text-[26px] sm:text-[32px] md:text-[40px] max-w-6xl! mx-auto"

      />
    </main>
  );
}