"use server";

import ivoryHero from "@assets/images/projects/projectsCatalogue/projects/ivoryhero.png";
import ivoryHeroB from "@assets/images/projects/projectsCatalogue/projects/ivoryherob.png";
import ivoryHeroC from "@assets/images/projects/projectsCatalogue/projects/ivoryheroc.png";
import ivoryColumnA from "@assets/images/projects/projectsCatalogue/projects/ivorycolumna.png";
import ivoryColumnB from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnb.png";
import ivoryColumnC from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnc.png";
import ivoryColumnD from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnd.png";
import ivoryColumnE from "@assets/images/projects/projectsCatalogue/projects/ivorycolumne.png";
import ivoryColumnF from "@assets/images/projects/projectsCatalogue/projects/ivorycolumnf.png";
import {
  PROJECT_DETAIL_COLUMNS_PER_PAGE,
  PROJECT_DETAIL_HEROES_PER_PAGE,
} from "@features/projects/lib/projectsCatalogueQuery";

const apartmentMetaMap = {
  "apartment-1": { title: "APARTMENT PEARL", period: "JAN 2025" },
  "apartment-2": { title: "APARTMENT IVORY", period: "FEB 2025" },
  "apartment-3": { title: "APARTMENT AURA", period: "MAR 2025" },
};

const defaultMeta = { title: "APARTMENT PEARL", period: "JAN 2025" };

const placeholderHeroes = [ivoryHero.src, ivoryHeroB.src, ivoryHeroC.src];
const placeholderColumns = [
  ivoryColumnA.src,
  ivoryColumnB.src,
  ivoryColumnC.src,
  ivoryColumnD.src,
  ivoryColumnE.src,
  ivoryColumnF.src,
];

const paginate = (items, page, pageSize) => {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

export async function getApartmentDetailPage({
  apartmentId,
  page = 1,
  heroesPerPage = PROJECT_DETAIL_HEROES_PER_PAGE,
  columnsPerPage = PROJECT_DETAIL_COLUMNS_PER_PAGE,
}) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeHeroesPerPage = Number.isFinite(heroesPerPage)
    ? Math.max(1, Math.trunc(heroesPerPage))
    : PROJECT_DETAIL_HEROES_PER_PAGE;
  const safeColumnsPerPage = Number.isFinite(columnsPerPage)
    ? Math.max(1, Math.trunc(columnsPerPage))
    : PROJECT_DETAIL_COLUMNS_PER_PAGE;

  const meta = apartmentMetaMap[apartmentId] || defaultMeta;
  const subtitle =
    "Relaxation and peace of mind can come from a well designed space. Mimz interior";
  const heroes = placeholderHeroes;
  const columns = placeholderColumns;

  const totalPages = Math.max(
    Math.ceil(heroes.length / safeHeroesPerPage),
    Math.ceil(columns.length / safeColumnsPerPage),
    1
  );

  const boundedPage = Math.min(safePage, totalPages);

  await new Promise((resolve) => setTimeout(resolve, 160));

  return {
    id: apartmentId,
    title: meta.title,
    period: meta.period,
    subtitle,
    heroes: paginate(heroes, boundedPage, safeHeroesPerPage),
    columns: paginate(columns, boundedPage, safeColumnsPerPage),
    heroTotal: heroes.length,
    columnTotal: columns.length,
    totalPages,
    page: boundedPage,
  };
}
