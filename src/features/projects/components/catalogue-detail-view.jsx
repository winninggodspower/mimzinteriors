"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import seperator from "@assets/images/seperator.png"
import { aosReveal, fadeUpItem, heroScaleLoop, sectionReveal, staggerContainer } from "@features/lib/motion"

export default function CatalogueDetailView({
  entityLabel = "Project",
  data,
  page,
  isLoading,
  isFetching,
  isError,
  totalPages,
  canGoPrev,
  canGoNext,
  updatePageInUrl,
  gallerySectionRef,
}) {
  const [hasImageLoadError, setHasImageLoadError] = useState(false)
  const sectionMotion = sectionReveal()
  const metaMotion = staggerContainer(0.08)
  const handleImageError = useCallback(() => {
    setHasImageLoadError(true)
  }, [])

  const topHero = data?.hero || null
  const rows = data?.rows || []
  const columns = data?.columns || []
  const hasGalleryMedia = columns.length > 0 || rows.length > 0
  const entityLabelLower = entityLabel.toLowerCase()
  const fallbackTitle = entityLabel.toUpperCase()
  const columnPairs = Array.from({ length: Math.ceil(columns.length / 2) }, (_, pairIndex) =>
    columns.slice(pairIndex * 2, pairIndex * 2 + 2),
  )
  const hasMissingImages = !topHero || columns.some((image) => !image) || rows.some((image) => !image)
  const hasImageErrorState = !isLoading && (isError || hasImageLoadError || hasMissingImages)

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
              alt={data?.title || `${entityLabel} hero`}
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
            {data?.title || fallbackTitle}
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

      <section className="prjdp-gallery" ref={gallerySectionRef}>
        {isLoading ? (
          <div className="prjdp-loading">Loading {entityLabelLower}...</div>
        ) : hasImageErrorState ? (
          <div className="prjdp-loading" role="alert">
            We could not load this {entityLabelLower}&apos;s images right now. Please try again.
          </div>
        ) : !hasGalleryMedia ? (
          <div className="prjdp-loading">No detail images uploaded yet.</div>
        ) : (
          <>
            {columnPairs.map((pair, pairIndex) => (
              <div key={`pair-${pairIndex}`}>
                <div className="prjdp-two-col">
                  {pair.map((imageSrc, imageIndex) => (
                    <motion.div
                      key={`col-${pairIndex}-${imageIndex}`}
                      className="group relative w-full h-215 overflow-hidden bg-[#f2f2f2]"
                      variants={fadeUpItem({ y: 20, duration: 0.56, delay: pairIndex * 0.04 + imageIndex * 0.03 })}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.24 }}
                    >
                      <Image
                        src={imageSrc}
                        alt={`${data?.title || entityLabel} detail ${pairIndex * 2 + imageIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        onError={handleImageError}
                      />
                    </motion.div>
                  ))}
                </div>

                {rows[pairIndex] ? (
                  <motion.div
                    className="group relative mb-[clamp(4px,0.42vw,8px)] w-full h-200 overflow-hidden bg-[#f2f2f2]"
                    variants={fadeUpItem({ y: 24, duration: 0.6, delay: pairIndex * 0.06 + 0.05 })}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <Image
                      src={rows[pairIndex]}
                      alt={`${data?.title || entityLabel} row ${pairIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="100vw"
                      onError={handleImageError}
                    />
                  </motion.div>
                ) : null}
              </div>
            ))}
          </>
        )}

        {hasGalleryMedia && !hasImageErrorState ? (
          <div className="prjdp-pagination-wrap">
            <button
              type="button"
              className="prjdp-page-btn"
              disabled={!canGoPrev || isFetching}
              onClick={() => updatePageInUrl(page - 1, totalPages)}
            >
              &lt; Previous
            </button>

            <button
              type="button"
              className="prjdp-page-btn"
              disabled={!canGoNext || isFetching}
              onClick={() => updatePageInUrl(page + 1, totalPages)}
            >
              Next &gt;
            </button>
          </div>
        ) : null}
      </section>

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
  )
}
