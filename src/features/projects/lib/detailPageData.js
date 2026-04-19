export function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

export function sortMediaByOrder(items) {
  return [...items].sort((leftItem, rightItem) => leftItem.order - rightItem.order)
}

export function formatEntityPeriod(inputDate) {
  if (!inputDate) {
    return ""
  }

  const date = new Date(inputDate)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return date
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase()
}

export function buildDetailPageData({
  id,
  title,
  period,
  subtitle,
  profileImage,
  media,
  page,
  columnsPerPage,
}) {
  const orderedMedia = sortMediaByOrder(media)
  const hero = orderedMedia.find((mediaItem) => mediaItem.slot === "hero")?.src || profileImage || null
  const rows = orderedMedia.filter((mediaItem) => mediaItem.slot === "row").map((mediaItem) => mediaItem.src)
  const columns = orderedMedia.filter((mediaItem) => mediaItem.slot === "column").map((mediaItem) => mediaItem.src)
  const safeRowsPerPage = Math.max(1, Math.floor(columnsPerPage / 3))
  const totalPages = Math.max(
    Math.ceil(rows.length / safeRowsPerPage),
    Math.ceil(columns.length / columnsPerPage),
    1,
  )
  const boundedPage = Math.min(page, totalPages)

  return {
    id,
    title,
    period,
    subtitle,
    media: orderedMedia,
    hero,
    rows: paginate(rows, boundedPage, safeRowsPerPage),
    columns: paginate(columns, boundedPage, columnsPerPage),
    heroTotal: hero ? 1 : 0,
    rowTotal: rows.length,
    columnTotal: columns.length,
    totalPages,
    page: boundedPage,
  }
}
