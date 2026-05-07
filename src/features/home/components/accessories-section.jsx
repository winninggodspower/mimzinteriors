"use client";

import Image from "next/image";
import Link from "next/link";

export default function AccessoriesSection({ title, paragraphs, imageSrc, imageAlt, href }) {
  return (
    <section className="bg-white px-6 pb-24 pt-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1100px] items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-[96px]">
        <div className="max-w-[31rem] lg:pl-14">
          <h2 className="font-caterina text-[1.9rem] leading-none uppercase sm:text-[2.2rem]">
            {title}
          </h2>

          <div className="mt-5 space-y-3">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-aref-ruqaa text-[0.95rem] sm:text-[1.02rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            href={href}
            className="mt-7 inline-flex min-w-28 items-center justify-center rounded-[8px] bg-[#cb912d] px-6 py-3 font-aref-ruqaa text-[1rem] leading-none uppercase text-white transition-colors duration-200 hover:bg-[#b88024]"
          >
            View More
          </Link>
        </div>

        <div className="justify-self-start md:justify-self-center  lg:justify-self-end">
          <div className="relative w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={760}
              height={620}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
