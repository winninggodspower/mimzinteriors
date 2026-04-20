import { useCallback, useMemo, useRef, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getApartmentsCataloguePage } from "@features/projects/data/apartments";
import {
  APARTMENTS_CATALOGUE_PAGE_SIZE,
  apartmentsCatalogueQueryKey,
} from "@features/projects/lib/projectsCatalogueQueryKeys";

export function useApartmentsPagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const apartmentsSectionRef = useRef(null);
  const [isRoutePending, startTransition] = useTransition();

  const page = useMemo(() => {
    const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);

    if (Number.isNaN(rawPage) || rawPage < 1) {
      return 1;
    }

    return rawPage;
  }, [searchParams]);

  const scrollToApartmentsTop = () => {
    if (!apartmentsSectionRef.current) {
      return;
    }

    apartmentsSectionRef.current.scrollIntoView({
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
      scrollToApartmentsTop();
    },
    [page, pathname, router, searchParams, startTransition],
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: apartmentsCatalogueQueryKey(page, APARTMENTS_CATALOGUE_PAGE_SIZE),
    queryFn: () =>
      getApartmentsCataloguePage({
        page,
        limit: APARTMENTS_CATALOGUE_PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / APARTMENTS_CATALOGUE_PAGE_SIZE) || 1;
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;
  const isPageChangePending = isFetching || isRoutePending;

  return {
    page,
    data,
    isLoading,
    isFetching,
    totalPages,
    canGoPrev,
    canGoNext,
    isPageChangePending,
    updatePageInUrl,
    apartmentsSectionRef,
  };
}