"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MOTION_DURATIONS, MOTION_EASE, MOTION_VIEWPORT } from "@features/lib/motion";
import { useAccessoriesPagination } from "./useAccessoriesPagination";

const getGridColumnCount = () => {
  if (typeof window === "undefined") {
    return 4;
  }

  if (window.matchMedia("(max-width: 768px)").matches) {
    return 2;
  }

  if (window.matchMedia("(max-width: 1024px)").matches) {
    return 3;
  }

  return 4;
};

const rowStaggerDelay = (index, columns) => {
  const row = Math.floor(index / columns);
  const col = index % columns;

  return row * 0.04 + col * 0.12;
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.cardFast,
      ease: MOTION_EASE,
      delay,
    },
  }),
};

export default function AccessoriesPage() {
  const {
    page,
    updatePageInUrl,
    galleryRef,
    data,
    isLoading,
    isFetching,
    totalPages,
    canGoPrev,
    canGoNext,
  } = useAccessoriesPagination();

  const gridColumns = getGridColumnCount();

  return (
    <main className="accs-main">
      <section className="accs-head">
        <h1 className="accs-title">ACCESSORIES</h1>
        <p className="accs-subtitle">
          "Accessories are the punctuation marks of a room
          <br />
          — They complete the sentence and give it personality."
        </p>
      </section>

      <section className="accs-grid-section" ref={galleryRef}>
        {isLoading ? (
          <div className="accs-loading">Loading accessories...</div>
        ) : (
          <motion.div className="accs-grid">
            {data?.items?.map((item, index) => (
              <motion.article
                key={item.id}
                className="accs-card"
                variants={cardVariants}
                custom={rowStaggerDelay(index, gridColumns)}
                initial="hidden"
                whileInView="visible"
                viewport={{ ...MOTION_VIEWPORT, amount: 0.2 }}
              >
                <div className="accs-card-img-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="accs-card-img"
                    sizes="(min-width: 1200px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        <div className="accs-pagination-wrap">
          <button
            type="button"
            className="accs-page-btn"
            disabled={!canGoPrev || isFetching}
            onClick={() => updatePageInUrl(page - 1, totalPages)}
          >
            &lt;
          </button>

          <button
            type="button"
            className="accs-page-btn"
            disabled={!canGoNext || isFetching}
            onClick={() => updatePageInUrl(page + 1, totalPages)}
          >
            &gt;
          </button>
        </div>
      </section>
    </main>
  );
}