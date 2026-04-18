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
} from "@features/projects/lib/projectsCatalogueQueryKeys";

const apartmentMetaMap = {
  "apartment-1": { title: "APARTMENT PEARL", period: "JAN 2025" },
  "apartment-2": { title: "APARTMENT IVORY", period: "FEB 2025" },
  "apartment-3": { title: "APARTMENT AURA", period: "MAR 2025" },
};

const defaultMeta = { title: "APARTMENT PEARL", period: "JAN 2025" };

const placeholderMedia = [
  { id: "apartment-hero-1", src: ivoryHero.src, slot: "hero", order: 1 },
  { id: "apartment-column-1", src: ivoryColumnA.src, slot: "column", order: 2 },
  { id: "apartment-column-2", src: ivoryColumnB.src, slot: "column", order: 3 },
  { id: "apartment-row-1", src: ivoryHeroB.src, slot: "row", order: 4 },
  { id: "apartment-column-3", src: ivoryColumnC.src, slot: "column", order: 5 },
  { id: "apartment-column-4", src: ivoryColumnD.src, slot: "column", order: 6 },
  { id: "apartment-row-2", src: ivoryHeroC.src, slot: "row", order: 7 },
  { id: "apartment-column-5", src: ivoryColumnE.src, slot: "column", order: 8 },
  { id: "apartment-column-6", src: ivoryColumnF.src, slot: "column", order: 9 },
];

const paginate = (items, page, pageSize) => {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

const sortByOrder = (items) => [...items].sort((leftItem, rightItem) => leftItem.order - rightItem.order);

export async function getApartmentDetailPage({
  apartmentId,
  page = 1,
  columnsPerPage = PROJECT_DETAIL_COLUMNS_PER_PAGE,
}) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeColumnsPerPage = Number.isFinite(columnsPerPage)
    ? Math.max(1, Math.trunc(columnsPerPage))
    : PROJECT_DETAIL_COLUMNS_PER_PAGE;

  const meta = apartmentMetaMap[apartmentId] || defaultMeta;
  const subtitle =
    "Relaxation and peace of mind can come from a well designed space. Mimz interior";
  const media = sortByOrder(placeholderMedia);
  const hero = media.find((mediaItem) => mediaItem.slot === "hero")?.src || null;
  const safeRowsPerPage = Math.max(1, Math.floor(safeColumnsPerPage / 3));
  const columns = media.filter((mediaItem) => mediaItem.slot === "column").map((mediaItem) => mediaItem.src);
  const rows = media.filter((mediaItem) => mediaItem.slot === "row").map((mediaItem) => mediaItem.src);

  const totalPages = Math.max(
    Math.ceil(rows.length / safeRowsPerPage),
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
    media,
    hero,
    columns: paginate(columns, boundedPage, safeColumnsPerPage),
    rows: paginate(rows, boundedPage, safeRowsPerPage),
    heroTotal: hero ? 1 : 0,
    columnTotal: columns.length,
    rowTotal: rows.length,
    totalPages,
    page: boundedPage,
  };
}
