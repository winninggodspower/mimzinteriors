"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { aosReveal, sectionReveal } from "@features/lib/motion";
import Link from "next/link";

const ctaReveal = {
  initial: { opacity: 0, y: 28, scale: 0.94 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.8 },
  transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
};

export default function QuoteSection(
  { text,
    author = null,
    showIcon = true,
    className = "",
    textClassName = "",
    showQuoteIcon = true,
    showBtn = false,
  }) {
  const sectionMotion = sectionReveal({ y: 28 });

  return (
    <motion.section
      className={`my-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,8vw,10rem)] mx-auto max-w-225 ${className}`}
      {...sectionMotion}
    >
      <div className="mx-auto text-center">
        <div className="flex flex-col items-center">
          <motion.blockquote
            className={`mb-3 border-none bg-none p-0 font-bd-megalona text-[26px] font-normal italic leading-none text-black sm:text-[32px] md:text-[40px] ${textClassName}`}
            {...aosReveal({ direction: "up", distance: 32 })}
          >
            {showQuoteIcon && (
              <span className="mr-[0.1em] align-[-0.1em] text-[clamp(2rem,5vw,3.5rem)] font-normal leading-0 text-black">
                "
              </span>
            )}

            {text}

            {showQuoteIcon && (
              <span className="ml-[0.1em] align-[-0.1em] text-[clamp(2rem,5vw,3.5rem)] font-normal leading-0 text-black">
                "
              </span>
            )}
            {author ? (
              <motion.p
                className="mt-1 font-aref-ruqaa text-lg md:text-2xl"
                {...aosReveal({ direction: "up", distance: 20, delay: 0.15 })}
              >
                - {author}
              </motion.p>
            ) : null}
          </motion.blockquote>

          {showIcon && (
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
          )}
        
          {showBtn && (
          <motion.div {...ctaReveal} className="mt-5 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[10px] bg-[#c58d2f] px-7 py-3 font-caterina text-[1.15rem] font-light uppercase tracking-[0.01em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b27d27]"
            >
              Get In Touch
            </Link>
          </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
