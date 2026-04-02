export const PROJECTS_CATALOGUE_PAGE_SIZE = 12;

export const projectsCatalogueQueryKey = (page, pageSize = PROJECTS_CATALOGUE_PAGE_SIZE) => [
  "projectsCatalogue",
  page,
  pageSize,
];
