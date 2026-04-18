import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useProjectsCataloguePagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

      router.replace(nextUrl, { scroll: false });
    },
    [page, pathname, router, searchParams],
  );

  return { page, updatePageInUrl };
}