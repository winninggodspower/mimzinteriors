"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import projectHero from "@assets/images/projects/projectsCatalogue/projectscataloguehero.png";
import seperator from "@assets/images/seperator.png";
import {
  aosReveal,
  MOTION_STAGGER,
  MOTION_VIEWPORT,
  MOTION_DURATIONS,
  fadeUpItem,
  heroScaleLoop,
  sectionReveal,
  staggerContainer,
} from "@features/lib/motion";
import { getProjectsCataloguePage } from "../../../app/projects/projectCatalogue/actions";
import {
  PROJECTS_CATALOGUE_PAGE_SIZE,
  projectsCatalogueQueryKey,
} from "@features/projects/lib/projectsCatalogueQuery";

export default function ProjectsCatalogue() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const catalogueSectionRef = useRef(null);

  const page = useMemo(() => {
    const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);

    if (Number.isNaN(rawPage) || rawPage < 1) {
      return 1;
    }

    return rawPage;
  }, [searchParams]);

  const sectionMotion = sectionReveal();
  const cardContainer = staggerContainer(MOTION_STAGGER.tight);
  const cardItem = fadeUpItem({ duration: MOTION_DURATIONS.cardFast });

  const scrollToCatalogueTop = () => {
    if (!catalogueSectionRef.current) {
      return;
    }

    catalogueSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const updatePageInUrl = (nextPage, totalPages) => {
    const boundedPage = Math.max(1, Math.min(nextPage, totalPages));

    if (boundedPage === page) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (boundedPage === 1) {
      params.delete("page");
    } else {
      params.set("page", String(boundedPage));
    }

    const query = params.toString();
    const nextUrl = query ? `${pathname}?${query}` : pathname;

    router.replace(nextUrl, { scroll: false });
    scrollToCatalogueTop();
  };

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

  const totalPages = useMemo(() => {
    if (!data?.total) {
      return 1;
    }
    return Math.ceil(data.total / PROJECTS_CATALOGUE_PAGE_SIZE);
  }, [data?.total]);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

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

      <motion.section className="prjc-gallery-section" ref={catalogueSectionRef} {...sectionMotion}>
        {isLoading ? (
          <div className="prjc-loading">Loading projects...</div>
        ) : (
          <motion.div
            className="prjc-gallery-grid"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={MOTION_VIEWPORT}
          >
            {data?.projects?.map((project, index) => (
              <motion.article
                key={project.id}
                className="prjc-card"
                variants={cardItem}
              >
                <Link
                  href={`/projects/projectCatalogue/${project.id}`}
                  className="prjc-card-image-wrap"
                  aria-label={project.title}
                >
                  <Image
                    src={project.profileImage}
                    alt={project.title}
                    fill
                    className="prjc-card-image"
                    sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <span className="prjc-card-overlay-title">{project.title}</span>
                </Link>
                </motion.article>
            ))}
            </motion.div>
        )}

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