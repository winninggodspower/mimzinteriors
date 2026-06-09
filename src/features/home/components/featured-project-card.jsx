

"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedProjectCard({
  title,
  description,
  date,
  image,
  href = "/projects/project_catalogue",
}) {
  return (
    <Link href={href} className="group block overflow-hidden bg-white">
      <div className="relative h-[382px] overflow-hidden">

        {/* IMAGE */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* HOVER CONTENT */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <h3 className="font-caterina text-2xl md:text-4xl  uppercase text-white">
            {title}
          </h3>

          <p className="max-w-md text-white">
              
          </p>

          <p className="text-white">
            Mimz Interior
          </p>
        </div>

        {/* BOTTOM PANEL (FIXED + SMOOTH EXIT) */}
        <div
          className="
            absolute bottom-0 left-0 right-0 z-20
            flex items-center justify-between gap-4 bg-[#E3CEBC] px-4 py-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] sm:px-5 sm:py-[1.125rem]
            transition-all duration-700 ease-out
            group-hover:opacity-0 group-hover:translate-y-6
          "
        >
          <h3 className="font-caterina text-[1.15rem] leading-none uppercase text-[#151515] sm:text-[1.6rem]">
          {title}
        </h3>
        <p className="shrink-0 font-aref-ruqaa text-sm leading-none sm:text-base">
          {date}
        </p>
        </div>

      </div>
    </Link>
  );
}