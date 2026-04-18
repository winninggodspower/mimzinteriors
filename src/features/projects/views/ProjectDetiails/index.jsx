"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import seperator from "@assets/images/seperator.png";
import { aosReveal, fadeUpItem, heroScaleLoop, sectionReveal, staggerContainer } from "@features/lib/motion";
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
  const metaMotion = staggerContainer(0.08);
  const handleImageError = useCallback(() => {
    setHasImageLoadError(true);
  }, []);

  const topHero = data?.hero || null;
  const rows = data?.rows || [];
  const columns = data?.columns || [];
  const columnPairs = Array.from({ length: Math.ceil(columns.length / 2) }, (_, pairIndex) =>
    columns.slice(pairIndex * 2, pairIndex * 2 + 2)
  );
  const hasMissingImages = !topHero || (columns.length === 0 && rows.length === 0) || columns.some((image) => !image) || rows.some((image) => !image);
  const hasImageErrorState = !isLoading && (isError || hasImageLoadError || hasMissingImages);

  return (
    <main className="prjdp-main">
      <motion.section className="prjdp-hero" {...sectionMotion}>
        {!hasImageErrorState && topHero ? (
          <motion.div
            {...heroScaleLoop({ scale: 1.04 })}
            className="hero-container"
          >
            <Image
              src={topHero}
              alt={data?.title || "Project hero"}
              fill
              priority
              className="hero-image"
              sizes="100vw"
              onError={handleImageError}
            />
          </motion.div>
        ) : null}
      </motion.section>

      <motion.section className="prjdp-meta" {...sectionMotion}>
        <motion.div
          className="mx-auto flex max-w-225 flex-col items-center text-center"
          variants={metaMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h1
            className="prjdp-title"
            variants={fadeUpItem({ y: 14, duration: 0.58 })}
          >
            {data?.title || "PROJECT"}
          </motion.h1>
          <motion.p
            className="prjdp-period"
            variants={fadeUpItem({ y: 12, duration: 0.52, delay: 0.08 })}
          >
            {data?.period || ""}
          </motion.p>
          <motion.p
            className="prjdp-description"
            variants={fadeUpItem({ y: 12, duration: 0.56, delay: 0.16 })}
          >
            {data?.subtitle || ""}
          </motion.p>
        </motion.div>
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
                      className="group relative w-full h-215 overflow-hidden bg-[#f2f2f2]"
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

                {rows[pairIndex] ? (
                  <div className="group relative mb-[clamp(4px,0.42vw,8px)] w-full h-200 overflow-hidden bg-[#f2f2f2]">
                    <Image
                      src={rows[pairIndex]}
                      alt={`${data?.title || "Project"} row ${pairIndex + 1}`}
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