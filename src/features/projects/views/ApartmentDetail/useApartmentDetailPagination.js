import { useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getApartmentDetailPage } from "@features/projects/data/apartmentDetail";
import {
  apartmentDetailQueryKey,
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQueryKeys";

export function useApartmentDetailPagination(apartmentId) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gallerySectionRef = useRef(null);

  const page = useMemo(() => {
    const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);

    if (Number.isNaN(rawPage) || rawPage < 1) {
      return 1;
    }

    return rawPage;
  }, [searchParams]);

  const scrollToGalleryTop = () => {
    if (!gallerySectionRef.current) {
      return;
    }

    gallerySectionRef.current.scrollIntoView({
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
    scrollToGalleryTop();
  };

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: apartmentDetailQueryKey(apartmentId, page),
    queryFn: () =>
      getApartmentDetailPage({
        apartmentId,
        page,
        columnsPerPage: PROJECT_DETAIL_COLUMNS_PER_PAGE,
      }),
    placeholderData: keepPreviousData,
    throwOnError: false,
  });

  const totalPages = data?.totalPages || 1;
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return {
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
  };
}