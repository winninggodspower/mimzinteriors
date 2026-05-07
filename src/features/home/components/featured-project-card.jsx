"use client";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedProjectCard({ title, date, image, href = "/projects/project_catalogue" }) {
  return (
    <Link
      href={href}
      className="group block bg-white transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <div className="relative h-[382px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
        />
      </div>
      <div className="flex items-center justify-between gap-4 bg-[#CEAD8B]/30 px-4 py-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] sm:px-5 sm:py-[1.125rem]">
        <h3 className="font-caterina text-[1.15rem] leading-none uppercase text-[#151515] sm:text-[1.6rem]">
          {title}
        </h3>
        <p className="shrink-0 font-aref-ruqaa text-sm leading-none sm:text-base">
          {date}
        </p>
      </div>
    </Link>
  );
}
