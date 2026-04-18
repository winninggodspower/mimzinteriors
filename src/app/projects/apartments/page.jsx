import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {
  APARTMENTS_CATALOGUE_PAGE_SIZE,
  apartmentsCatalogueQueryKey,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import ApartmentsPage from "@features/projects/pages/Apartments";
import { getApartmentsCataloguePage } from "./actions";

const Apartments = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Math.max(
    1,
    Number.parseInt(resolvedSearchParams?.page || "1", 10) || 1
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: apartmentsCatalogueQueryKey(
      requestedPage,
      APARTMENTS_CATALOGUE_PAGE_SIZE
    ),
    queryFn: () =>
      getApartmentsCataloguePage({
        page: requestedPage,
        limit: APARTMENTS_CATALOGUE_PAGE_SIZE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ApartmentsPage />
    </HydrationBoundary>
  );
};

export default Apartments;