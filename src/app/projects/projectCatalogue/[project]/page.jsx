import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProjectCatalogueProject from "@features/projects/pages/ProjectCatalogueProject";
import {
  projectDetailQueryKey,
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
  PROJECT_DETAIL_HEROES_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQuery";
import { getProjectDetailPage } from "./actions";

const ProjectDetailPage = async ({ params, searchParams }) => {
  const { project } = await params;
  const resolvedSearchParams = await searchParams;
  const requestedPage = Math.max(
    1,
    Number.parseInt(resolvedSearchParams?.page || "1", 10) || 1
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: projectDetailQueryKey(project, requestedPage),
    queryFn: () =>
      getProjectDetailPage({
        projectId: project,
        page: requestedPage,
        heroesPerPage: PROJECT_DETAIL_HEROES_PER_PAGE,
        columnsPerPage: PROJECT_DETAIL_COLUMNS_PER_PAGE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectCatalogueProject projectId={project} />
    </HydrationBoundary>
  );
};

export default ProjectDetailPage;
