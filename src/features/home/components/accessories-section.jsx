"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const sectionVariants = {
  hidden: { opacity: 0, y: 52, scale: 0.975 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.12, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.06, rotateY: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const textVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AccessoriesSection({ title, paragraphs, imageSrc, imageAlt, href }) {
  return (
    <motion.section
      className="bg-white px-6 pb-24 pt-12 sm:px-8 lg:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={sectionVariants}
    >
      <div className="mx-auto grid max-w-275 items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-24">
        <motion.div className="max-w-124 lg:pl-14" variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2
            className="font-caterina text-[1.9rem] leading-none uppercase sm:text-[2.2rem]"
            variants={{
              hidden: { opacity: 0, y: 24, letterSpacing: "-0.04em" },
              visible: { opacity: 1, y: 0, letterSpacing: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {title}
          </motion.h2>

          <motion.div className="mt-5 space-y-3" variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            {paragraphs.map((paragraph) => (
              <motion.p key={paragraph} className="font-aref-ruqaa text-[0.95rem] sm:text-[1.02rem]" variants={paragraphVariants}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={paragraphVariants}>
            <Link
              href={href}
              className="mt-7 inline-flex min-w-28 items-center justify-center rounded-[8px] bg-[#cb912d] px-6 py-3 font-aref-ruqaa text-[1rem] leading-none uppercase text-white transition-colors duration-200 hover:bg-[#b88024]"
            >
              View More
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="justify-self-start md:justify-self-center lg:justify-self-end" variants={imageVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={760}
              height={620}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
