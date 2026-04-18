"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import seperator from "@assets/images/seperator.png";
import { aosReveal, heroScaleLoop, sectionReveal } from "@features/lib/motion";
import { useProjectDetailPagination } from "./useProjectDetailPagination";

export default function ProectDetail({ projectId }) {
  const [hasImageLoadError, setHasImageLoadError] = useState(false);

  const {
    page,
    data,
    isLoading,
    isFetching,
    isError,
    totalPages,
    canGoPrev,
    canGoNext,
    updatePageInUrl,
    gallerySectionRef,
  } = useProjectDetailPagination(projectId);

  const sectionMotion = sectionReveal();
  const handleImageError = useCallback(() => {
    setHasImageLoadError(true);
  }, []);

  const heroes = data?.heroes || [];
  const columns = data?.columns || [];
  const columnPairs = [columns.slice(0, 2), columns.slice(2, 4), columns.slice(4, 6)];
  const interleavedHeroes = [heroes[1] || null, heroes[2] || null, null];

  const topHero = heroes[0] || null;
  const hasMissingImages = !topHero || heroes.length < 3 || columns.length < 6 || columns.some((image) => !image);
  const hasImageErrorState = !isLoading && (isError || hasImageLoadError || hasMissingImages);

  return (
    <main className="prjdp-main">
      <motion.section className="prjdp-hero" {...sectionMotion}>
        <div className="prjdp-hero-wrap">
          {!hasImageErrorState && topHero ? (
            <motion.div
              {...heroScaleLoop({ scale: 1.04 })}
              className="h-full w-full"
            >
              <Image
                src={topHero}
                alt={data?.title || "Project hero"}
                fill
                priority
                className="prjdp-hero-img"
                sizes="100vw"
                onError={handleImageError}
              />
            </motion.div>
          ) : null}
        </div>
      </motion.section>

      <motion.section className="prjdp-meta" {...sectionMotion}>
        <motion.h1 className="prjdp-title" {...aosReveal({ direction: "right", distance: 38 })}>
          {data?.title || "PROJECT"}
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
          <div className="prjdp-loading">Loading project...</div>
        ) : hasImageErrorState ? (
          <div className="prjdp-loading" role="alert">
            We could not load this project's images right now. Please try again.
          </div>
        ) : (
          <>
            {columnPairs.map((pair, pairIndex) => (
              <div key={`pair-${pairIndex}`}>
                <div className="prjdp-two-col">
                  {pair.map((imageSrc, imageIndex) => (
                    <div
                      key={`col-${pairIndex}-${imageIndex}`}
                      className="group relative w-full overflow-hidden bg-[#f2f2f2] aspect-390/430 md:aspect-5/6"
                    >
                      <Image
                        src={imageSrc}
                        alt={`${data?.title || "Project"} detail ${pairIndex * 2 + imageIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </div>

                {interleavedHeroes[pairIndex] ? (
                  <div className="group relative mb-[clamp(4px,0.42vw,8px)] w-full overflow-hidden bg-[#f2f2f2] aspect-820/690 md:aspect-1440/780">
                    <Image
                      src={interleavedHeroes[pairIndex]}
                      alt={`${data?.title || "Project"} hero ${pairIndex + 2}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="100vw"
                      onError={handleImageError}
                    />
                  </div>
                ) : null}
              </div>
            ))}
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