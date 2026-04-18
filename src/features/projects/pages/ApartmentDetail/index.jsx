"use client";

import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import seperator from "@assets/images/seperator.png";
import { aosReveal, heroScaleLoop, sectionReveal } from "@features/lib/motion";
import ivoryHero from "@assets/images/projects/projectsCatalogue/projects/ivoryhero.png";
import ivoryHeroB from "@assets/images/projects/projectsCatalogue/projects/ivoryherob.png";
import ivoryHeroC from "@assets/images/projects/projectsCatalogue/projects/ivoryheroc.png";
import ivoryColumnA from "@assets/images/projects/projectsCatalogue/projects/ivorycolumna.png";
import ivoryColumnB from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnb.png";
import ivoryColumnC from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnc.png";
import ivoryColumnD from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnd.png";
import ivoryColumnE from "@assets/images/projects/projectsCatalogue/projects/ivorycolumne.png";
import ivoryColumnF from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnf.png";
import { getApartmentDetailPage } from "../../../app/projects/apartments/[apartment]/actions";
import {
  apartmentDetailQueryKey,
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
  PROJECT_DETAIL_HEROES_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import { useApartmentDetailPagination } from "./useApartmentDetailPagination";

export default function ApartmentDetail({ apartmentId }) {
  const fallbackHeroes = [ivoryHero.src, ivoryHeroB.src, ivoryHeroC.src];
  const fallbackColumns = [
    ivoryColumnA.src,
    ivoryColumnB.src,
    ivoryColumnC.src,
    ivoryColumnD.src,
    ivoryColumnE.src,
    ivoryColumnF.src,
  ];

  const { page, updatePageInUrl, gallerySectionRef } = useApartmentDetailPagination();

  const sectionMotion = sectionReveal();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: apartmentDetailQueryKey(apartmentId, page),
    queryFn: () =>
      getApartmentDetailPage({
        apartmentId,
        page,
        heroesPerPage: PROJECT_DETAIL_HEROES_PER_PAGE,
        columnsPerPage: PROJECT_DETAIL_COLUMNS_PER_PAGE,
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const heroes = data?.heroes?.length ? data.heroes : fallbackHeroes;
  const columns = data?.columns?.length ? data.columns : fallbackColumns;

  const topHero = heroes[0] || null;
  const secondaryHero = heroes[1] || null;
  const tertiaryHero = heroes[2] || null;
  const totalPages = data?.totalPages || 1;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <main className="prjdp-main">
      <motion.section className="prjdp-hero" {...sectionMotion}>
        <div className="prjdp-hero-wrap">
          {topHero ? (
            <motion.div
              {...heroScaleLoop({ scale: 1.04 })}
              className="h-full w-full"
            >
              <Image
                src={topHero}
                alt={data?.title || "Apartment hero"}
                fill
                priority
                className="prjdp-hero-img"
                sizes="100vw"
              />
            </motion.div>
          ) : null}
        </div>
      </motion.section>

      <motion.section className="prjdp-meta" {...sectionMotion}>
        <motion.h1 className="prjdp-title" {...aosReveal({ direction: "right", distance: 38 })}>
          {data?.title || "APARTMENT"}
        </motion.h1>
        <motion.p className="prjdp-period" {...aosReveal({ direction: "left", distance: 28, delay: 0.04 })}>
          {data?.period || ""}
        </motion.p>
        <motion.p className="prjdp-description" {...aosReveal({ direction: "up", distance: 26, delay: 0.08 })}>
          {data?.subtitle || ""}
        </motion.p>
      </motion.section>

      <motion.section className="prjdp-gallery" ref={gallerySectionRef} {...sectionMotion}>
        {isLoading ? (
          <div className="prjdp-loading">Loading apartment...</div>
        ) : (
          <>
            <div className="prjdp-two-col">
              {columns[0] ? (
                <div className="prjdp-media prjdp-media-col">
                  <Image
                    src={columns[0]}
                    alt={`${data?.title || "Apartment"} detail 1`}
                    fill
                    className="prjdp-media-img"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ) : null}

              {columns[1] ? (
                <div className="prjdp-media prjdp-media-col">
                  <Image
                    src={columns[1]}
                    alt={`${data?.title || "Apartment"} detail 2`}
                    fill
                    className="prjdp-media-img"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ) : null}
            </div>

            {secondaryHero ? (
              <div className="prjdp-media prjdp-media-hero">
                <Image
                  src={secondaryHero}
                  alt={`${data?.title || "Apartment"} hero 2`}
                  fill
                  className="prjdp-media-img"
                  sizes="100vw"
                />
              </div>
            ) : null}

            <div className="prjdp-two-col">
              {columns[2] ? (
                <div className="prjdp-media prjdp-media-col">
                  <Image
                    src={columns[2]}
                    alt={`${data?.title || "Apartment"} detail 3`}
                    fill
                    className="prjdp-media-img"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ) : null}

              {columns[3] ? (
                <div className="prjdp-media prjdp-media-col">
                  <Image
                    src={columns[3]}
                    alt={`${data?.title || "Apartment"} detail 4`}
                    fill
                    className="prjdp-media-img"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ) : null}
            </div>

            {tertiaryHero ? (
              <div className="prjdp-media prjdp-media-hero">
                <Image
                  src={tertiaryHero}
                  alt={`${data?.title || "Apartment"} hero 3`}
                  fill
                  className="prjdp-media-img"
                  sizes="100vw"
                />
              </div>
            ) : null}

            <div className="prjdp-two-col">
              {columns[4] ? (
                <div className="prjdp-media prjdp-media-col">
                  <Image
                    src={columns[4]}
                    alt={`${data?.title || "Apartment"} detail 5`}
                    fill
                    className="prjdp-media-img"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ) : null}

              {columns[5] ? (
                <div className="prjdp-media prjdp-media-col">
                  <Image
                    src={columns[5]}
                    alt={`${data?.title || "Apartment"} detail 6`}
                    fill
                    className="prjdp-media-img"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ) : null}
            </div>
          </>
        )}

        <div className="prjdp-pagination-wrap">
          <motion.button
            type="button"
            className="prjdp-page-btn"
            disabled={!canGoPrev || isFetching}
            onClick={() => updatePageInUrl(page - 1, totalPages)}
            {...aosReveal({ direction: "left", distance: 18 })}
          >
            &lt; Previous
          </motion.button>

          <motion.button
            type="button"
            className="prjdp-page-btn"
            disabled={!canGoNext || isFetching}
            onClick={() => updatePageInUrl(page + 1, totalPages)}
            {...aosReveal({ direction: "right", distance: 18 })}
          >
            Next &gt;
          </motion.button>
        </div>
      </motion.section>

      <motion.section className="prjdp-quote" {...sectionMotion}>
        <div className="prjdp-quote-inner">
          <motion.blockquote {...aosReveal({ direction: "right", distance: 56, duration: 0.66 })}>
            We design and create spaces from residential homes to office spaces with a focus on functionality and aesthetic appeal. We are never out of style.
          </motion.blockquote>
          <div className="prjdp-separator-wrap" aria-hidden="true">
            <Image
              src={seperator}
              alt=""
              fill
              className="prjdp-separator-img"
              sizes="(min-width: 1024px) 190px, 40vw"
            />
          </div>
        </div>
      </motion.section>
    </main>
  );
}