"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAccessoriesPage } from "../../../app/projects/accessories/actions";
import {
  ACCESSORIES_PAGE_SIZE,
  accessoriesQueryKey,
} from "@features/projects/lib/projectsCatalogueQuery";

export default function AccessoriesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const galleryRef = useRef(null);

  const page = useMemo(() => {
    const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);

    if (Number.isNaN(rawPage) || rawPage < 1) {
      return 1;
    }

    return rawPage;
  }, [searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("accs-in-view");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const targets = document.querySelectorAll(".accs-animate");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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

  const totalPages = useMemo(() => {
    if (!data?.total) {
      return 1;
    }

    return Math.ceil(data.total / ACCESSORIES_PAGE_SIZE);
  }, [data?.total]);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const scrollToGridTop = () => {
    if (!galleryRef.current) {
      return;
    }

    galleryRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const updatePageInUrl = (nextPage) => {
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
    scrollToGridTop();
  };

  return (
    <main className="accs-main">
      <section className="accs-head accs-animate">
        <h1 className="accs-title">ACCESSORIES</h1>
        <p className="accs-subtitle">
          "Accessories are the punctuation marks of a room
          <br />
          — They complete the sentence and give it personality."
        </p>
      </section>

      <section className="accs-grid-section accs-animate" ref={galleryRef}>
        {isLoading ? (
          <div className="accs-loading">Loading accessories...</div>
        ) : (
          <div className="accs-grid">
            {data?.items?.map((item, index) => (
              <article
                key={item.id}
                className="accs-card"
                style={{ transitionDelay: `${index * 0.03}s` }}
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
              </article>
            ))}
          </div>
        )}

        <div className="accs-pagination-wrap">
          <button
            type="button"
            className="accs-page-btn"
            disabled={!canGoPrev || isFetching}
            onClick={() => updatePageInUrl(page - 1)}
          >
            &lt;
          </button>

          <button
            type="button"
            className="accs-page-btn"
            disabled={!canGoNext || isFetching}
            onClick={() => updatePageInUrl(page + 1)}
          >
            &gt;
          </button>
        </div>
      </section>
    </main>
  );
}
