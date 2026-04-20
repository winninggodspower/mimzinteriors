import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProectDetail from "@features/projects/views/ProjectDetiails";
import {
  projectDetailQueryKey,
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import { getProjectDetailPage } from "@features/projects/data/projectDetail";

export const metadata = {
  title: "Project Details — Mimz Interiors",
  description: "Detailed project catalogue view from Mimz Interiors.",
};

const ProjectDetailPage = async ({ params, searchParams }) => {
  const { projectId } = await params;
  const resolvedSearchParams = await searchParams;
  const requestedPage = Math.max(
    1,
    Number.parseInt(resolvedSearchParams?.page || "1", 10) || 1
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: projectDetailQueryKey(projectId, requestedPage),
    queryFn: () =>
      getProjectDetailPage({
        projectId: projectId,
        page: requestedPage,
        columnsPerPage: PROJECT_DETAIL_COLUMNS_PER_PAGE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProectDetail projectId={projectId} />
    </HydrationBoundary>
  );
};

export default ProjectDetailPage;
