import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AccessoriesPage from "@features/projects/pages/Accessories";
import {
  ACCESSORIES_PAGE_SIZE,
  accessoriesQueryKey,
} from "@features/projects/lib/projectsCatalogueQuery";
import { getAccessoriesPage } from "./actions";

const Accessories = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Math.max(
    1,
    Number.parseInt(resolvedSearchParams?.page || "1", 10) || 1
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: accessoriesQueryKey(requestedPage, ACCESSORIES_PAGE_SIZE),
    queryFn: () =>
      getAccessoriesPage({
        page: requestedPage,
        limit: ACCESSORIES_PAGE_SIZE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccessoriesPage />
    </HydrationBoundary>
  );
};

export default Accessories;