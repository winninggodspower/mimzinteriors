import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { PROJECTS_CATALOGUE_PAGE_SIZE, projectsCatalogueQueryKey } from "@features/projects/lib/projectsCatalogueQueryKeys";
import ProjectsCatalogue from "@features/projects/views/ProjectsCatalogue";
import { getProjectsCataloguePage } from "@features/projects/data/projectsCatalogue";

const ProjectCatalogue = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const requestedPage = Math.max(
    1,
    Number.parseInt(resolvedSearchParams?.page || "1", 10) || 1
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: projectsCatalogueQueryKey(
      requestedPage,
      PROJECTS_CATALOGUE_PAGE_SIZE
    ),
    queryFn: () =>
      getProjectsCataloguePage({
        page: requestedPage,
        limit: PROJECTS_CATALOGUE_PAGE_SIZE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <ProjectsCatalogue />
      </div>
    </HydrationBoundary>
  );
};

export default ProjectCatalogue;