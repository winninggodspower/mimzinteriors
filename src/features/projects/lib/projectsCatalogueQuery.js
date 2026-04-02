export const PROJECTS_CATALOGUE_PAGE_SIZE = 12;
export const ACCESSORIES_PAGE_SIZE = 32;
export const PROJECT_DETAIL_HEROES_PER_PAGE = 3;
export const PROJECT_DETAIL_COLUMNS_PER_PAGE = 6;

// Backward-compatible aliases
export const PROJECT_DETAIL_HERO_PAGE_SIZE = PROJECT_DETAIL_HEROES_PER_PAGE;
export const PROJECT_DETAIL_COLUMN_PAGE_SIZE = PROJECT_DETAIL_COLUMNS_PER_PAGE;

export const projectsCatalogueQueryKey = (page, pageSize = PROJECTS_CATALOGUE_PAGE_SIZE) => [
  "projectsCatalogue",
  page,
  pageSize,
];

export const accessoriesQueryKey = (
  page,
  pageSize = ACCESSORIES_PAGE_SIZE
) => ["accessories", page, pageSize];

export const projectDetailQueryKey = (
  projectId,
  page,
  heroPageSize = PROJECT_DETAIL_HEROES_PER_PAGE,
  columnPageSize = PROJECT_DETAIL_COLUMNS_PER_PAGE
) => [
  "projectDetail",
  projectId,
  page,
  heroPageSize,
  columnPageSize,
];
