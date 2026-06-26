import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {
  PROJECTS_CATALOGUE_PAGE_SIZE,
  projectsByTagQueryKey,
} from "@features/projects/lib/projectsCatalogueQueryKeys";
import ProjectsByTagPage from "@features/projects/views/ProjectsByTag";
import { getProjectsByTagPage } from "@features/projects/data/projectsByTag";

const VALID_TAGS = ["residential", "commercial"];

const ProjectsByTag = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const requestedTag = VALID_TAGS.includes(resolvedSearchParams?.tag)
    ? resolvedSearchParams.tag
    : "residential";
  const requestedPage = Math.max(
    1,
    Number.parseInt(resolvedSearchParams?.page || "1", 10) || 1
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: projectsByTagQueryKey(
      requestedTag,
      requestedPage,
      PROJECTS_CATALOGUE_PAGE_SIZE
    ),
    queryFn: () =>
      getProjectsByTagPage({
        tag: requestedTag,
        page: requestedPage,
        limit: PROJECTS_CATALOGUE_PAGE_SIZE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <ProjectsByTagPage />
      </div>
    </HydrationBoundary>
  );
};

export default ProjectsByTag;