"use client";

import Image from "next/image";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getAccessoriesPage } from "../../../app/projects/accessories/actions";
import {
  MOTION_STAGGER,
  fadeUpItem,
  sectionReveal,
  staggerContainer,
} from "@features/lib/motion";
import {
  ACCESSORIES_PAGE_SIZE,
  accessoriesQueryKey,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import { useAccessoriesPagination } from "./useAccessoriesPagination";

export default function AccessoriesPage() {
  const { page, updatePageInUrl, galleryRef } = useAccessoriesPagination();

  const sectionMotion = sectionReveal({ y: 24 });
  const cardContainer = staggerContainer(MOTION_STAGGER.micro);
  const cardItem = fadeUpItem({ y: 16 });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: accessoriesQueryKey(page, ACCESSORIES_PAGE_SIZE),
    queryFn: () =>
      getAccessoriesPage({
        page,
        limit: ACCESSORIES_PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / ACCESSORIES_PAGE_SIZE) || 1;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <main className="accs-main">
      <motion.section className="accs-head" {...sectionMotion}>
        <h1 className="accs-title">ACCESSORIES</h1>
        <p className="accs-subtitle">
          "Accessories are the punctuation marks of a room
          <br />
          — They complete the sentence and give it personality."
        </p>
      </motion.section>

      <motion.section className="accs-grid-section" ref={galleryRef} {...sectionMotion}>
        {isLoading ? (
          <div className="accs-loading">Loading accessories...</div>
        ) : (
          <motion.div
            className="accs-grid"
            variants={cardContainer}
            initial="hidden"
            animate="visible"
          >
            {data?.items?.map((item, index) => (
              <motion.article
                key={item.id}
                className="accs-card"
                variants={cardItem}
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
      </motion.section>
    </main>
  );
}