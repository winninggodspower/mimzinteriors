import { useCallback, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjectsCataloguePage } from "@features/projects/data/projectsCatalogue";
import {
  PROJECTS_CATALOGUE_PAGE_SIZE,
  projectsCatalogueQueryKey,
} from "@features/projects/lib/projectsCatalogueQueryKeys";

export function useProjectsCataloguePagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isRoutePending, startTransition] = useTransition();

  const page = useMemo(() => {
    const rawPage = Number.parseInt(searchParams.get("page") || "1", 10);

    if (Number.isNaN(rawPage) || rawPage < 1) {
      return 1;
    }

    return rawPage;
  }, [searchParams]);

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
    },
    [page, pathname, router, searchParams, startTransition],
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: projectsCatalogueQueryKey(page, PROJECTS_CATALOGUE_PAGE_SIZE),
    queryFn: () =>
      getProjectsCataloguePage({
        page,
        limit: PROJECTS_CATALOGUE_PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const totalPages = Math.ceil((data?.total || 0) / PROJECTS_CATALOGUE_PAGE_SIZE) || 1;
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;
  const showLoadingOverlay = isLoading || isFetching || isRoutePending;
  const isPageChangePending = isFetching || isRoutePending;

  return {
    page,
    data,
    totalPages,
    canGoPrev,
    canGoNext,
    showLoadingOverlay,
    isPageChangePending,
    updatePageInUrl,
  };
}