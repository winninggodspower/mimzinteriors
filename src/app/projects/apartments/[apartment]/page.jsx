import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ApartmentDetail from "@features/projects/pages/ApartmentDetail";
import {
  apartmentDetailQueryKey,
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
  PROJECT_DETAIL_HEROES_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import { getApartmentDetailPage } from "./actions";

const ApartmentDetailPage = async ({ params, searchParams }) => {
  const { apartment } = await params;
  const resolvedSearchParams = await searchParams;
  const requestedPage = Math.max(
    1,
    Number.parseInt(resolvedSearchParams?.page || "1", 10) || 1
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: apartmentDetailQueryKey(apartment, requestedPage),
    queryFn: () =>
      getApartmentDetailPage({
        apartmentId: apartment,
        page: requestedPage,
        heroesPerPage: PROJECT_DETAIL_HEROES_PER_PAGE,
        columnsPerPage: PROJECT_DETAIL_COLUMNS_PER_PAGE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ApartmentDetail apartmentId={apartment} />
    </HydrationBoundary>
  );
};

export default ApartmentDetailPage;
