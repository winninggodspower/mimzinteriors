"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { aosReveal, sectionReveal } from "@features/lib/motion";

export default function QuoteSection({ text, author=null }) {
  const sectionMotion = sectionReveal({ y: 28 });

  return (
    <motion.section
      className="py-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,8vw,10rem)] border-b border-[rgba(201,169,110,0.25)]"
      {...sectionMotion}
    >
      <div className="mx-auto max-w-225 text-center">
        <div className="flex flex-col items-center">
          <motion.blockquote
            className="m-0 border-none bg-none p-0 font-bd-megalona text-[26px] font-normal italic leading-none text-black sm:text-[32px] md:text-[40px]"
            {...aosReveal({ direction: "up", distance: 32 })}
          >
            <span className="mr-[0.1em] align-[-0.1em] text-[clamp(2rem,5vw,3.5rem)] font-normal leading-0 text-black">
              "
            </span>
            {text}
            <span className="ml-[0.1em] align-[-0.1em] text-[clamp(2rem,5vw,3.5rem)] font-normal leading-0 text-black">
              "
            </span>
          </motion.blockquote>

          {author ? (
            <motion.p
              className="mt-7 font-aref-ruqaa text-lg md:text-2xl"
              {...aosReveal({ direction: "up", distance: 20, delay: 0.15 })}
            >
              - {author}
            </motion.p>
          ) : null}

          <motion.div
            className="flex justify-center -mt-6"
            {...aosReveal({ direction: "up", distance: 20, delay: 0.25 })}
          >
            <Image
              src="/mimz-mascut-seperator.png"
              alt="separator image"
              height={178}
              width={273}
              className="h-auto w-44 sm:w-56 md:w-68.25"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
