"use client";

import { useCallback, useMemo, useRef, useTransition } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjectsByTagPage } from "@features/projects/data/projectsByTag";
import {
  PROJECTS_CATALOGUE_PAGE_SIZE,
  projectsByTagQueryKey,
} from "@features/projects/lib/projectsCatalogueQueryKeys";

const VALID_TAGS = ["home", "office", "hotel"];

export function useProjectsByTagPagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const galleryRef = useRef(null);
  const [isRoutePending, startTransition] = useTransition();

  const tag = useMemo(() => {
    const rawTag = params?.tag || "home";
    return VALID_TAGS.includes(rawTag) ? rawTag : "home";
  }, [params]);

  const page = useMemo(() => {
    const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);
    if (Number.isNaN(rawPage) || rawPage < 1) {
      return 1;
    }
    return rawPage;
  }, [searchParams]);

  const scrollToGalleryTop = () => {
    if (!galleryRef.current) {
      return;
    }
    galleryRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const updatePageInUrl = useCallback(
    (nextPage, totalPages) => {
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

      startTransition(() => {
        router.replace(nextUrl, { scroll: false });
      });
      scrollToGalleryTop();
    },
    [page, pathname, router, searchParams, startTransition],
  );

  const updateTag = useCallback(
    (nextTag) => {
      if (nextTag === tag) {
        return;
      }

      const nextUrl = `/projects/${nextTag}`;

      startTransition(() => {
        router.push(nextUrl);
      });
    },
    [tag, router, startTransition],
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: projectsByTagQueryKey(tag, page, PROJECTS_CATALOGUE_PAGE_SIZE),
    queryFn: () =>
      getProjectsByTagPage({
        tag,
        page,
        limit: PROJECTS_CATALOGUE_PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / PROJECTS_CATALOGUE_PAGE_SIZE) || 1;
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;
  const isPageChangePending = isFetching || isRoutePending;
  const showLoadingOverlay = isLoading || isFetching || isRoutePending;

  return {
    tag,
    page,
    data,
    isLoading,
    isFetching,
    totalPages,
    canGoPrev,
    canGoNext,
    isPageChangePending,
    showLoadingOverlay,
    updateTag,
    updatePageInUrl,
    galleryRef,
  };
}