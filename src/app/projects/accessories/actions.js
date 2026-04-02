"use server";

import accessoryA from "@assets/images/projects/accessories/accessorya.png";
import accessoryB from "@assets/images/projects/accessories/accessoryb.png";
import accessoryC from "@assets/images/projects/accessories/accessoryc.png";
import accessoryD from "@assets/images/projects/accessories/accessoryd.png";
import accessoryE from "@assets/images/projects/accessories/accessorye.png";
import accessoryF from "@assets/images/projects/accessories/accessoryf.png";
import accessoryG from "@assets/images/projects/accessories/accessoryg.png";
import accessoryH from "@assets/images/projects/accessories/accessoryh.png";
import { ACCESSORIES_PAGE_SIZE } from "@features/projects/lib/projectsCatalogueQuery";

const accessoryPool = [
  accessoryA.src,
  accessoryB.src,
  accessoryC.src,
  accessoryD.src,
  accessoryE.src,
  accessoryF.src,
  accessoryG.src,
  accessoryH.src,
];

const mockAccessories = Array.from({ length: 40 }, (_, index) => ({
  id: `accessory-${index + 1}`,
  image: accessoryPool[index % accessoryPool.length],
  title: `Accessory ${index + 1}`,
}));

export async function getAccessoriesPage({ page = 1, limit = ACCESSORIES_PAGE_SIZE }) {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.trunc(page)) : 1;
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.trunc(limit)) : ACCESSORIES_PAGE_SIZE;
  const offset = (safePage - 1) * safeLimit;

  // Replace this mock block with your backend action/API call later.
  // Example:
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accessories?offset=${offset}&limit=${safeLimit}`, { cache: "no-store" });
  // const payload = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 180));

  const items = mockAccessories.slice(offset, offset + safeLimit);

  return {
    items,
    total: mockAccessories.length,
    limit: safeLimit,
    offset,
  };
}
