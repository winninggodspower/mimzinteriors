"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { aosReveal } from "@features/lib/motion";
import { serviceShowcase } from "@features/service/data";

const showcaseItem = {
  hidden: (index) => ({
    opacity: 0,
    y: 20,
    x: index % 2 === 0 ? -14 : 14,
    rotate: index % 2 === 0 ? -0.7 : 0.7,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageReveal = {
  initial: { opacity: 0, scale: 1.06, clipPath: "inset(0 0 14% 0)" },
  whileInView: { opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" },
  viewport: { once: true, amount: 0.45 },
  transition: { duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
};

export default function ServiceShowcase({ sectionMotion }) {
  return (
    <motion.section
      className=""
      {...sectionMotion}
    >
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:px-10 lg:pt-16 lg:pb-28">
        <div className="pt-1">
          <motion.h2
            className="mb-4 font-caterina text-[clamp(2.1rem,4vw,3.1rem)] font-light uppercase leading-[0.95] tracking-[-0.03em] text-[#111]"
            initial={{ opacity: 0, x: -24, skewX: -4 }}
            whileInView={{ opacity: 1, x: 0, skewX: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {serviceShowcase.title}
          </motion.h2>

          <motion.p
            className="mb-7 max-w-[58ch] text-[clamp(0.98rem,1.05vw,1.08rem)] leading-[1.9] text-black"
            {...aosReveal({ direction: "up", distance: 18, delay: 0.05 })}
          >
            {serviceShowcase.intro}
          </motion.p>

          <div className="grid max-w-[62ch] gap-4">
            {serviceShowcase.items.map((item, index) => (
              <motion.article
                key={item.title}
                className="pb-1"
                variants={showcaseItem}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.45 }}
                whileHover={{ x: 3, transition: { duration: 0.2 } }}
              >
                <motion.h3
                  className="mb-1.5 inline-flex w-fit font-aref-ruqaa text-base font-normal leading-4 text-black uppercase [-webkit-text-stroke:0.3px_black]"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.45, delay: 0.06 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="m-0 text-[clamp(0.9rem,0.95vw,1rem)] leading-[1.65] text-black"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.description}
                </motion.p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="group relative flex min-h-[320px] justify-start overflow-hidden lg:min-h-[560px] lg:justify-end"
          {...imageReveal}
        >
          <Image
            src={serviceShowcase.image.src}
            alt={serviceShowcase.image.alt}
            fill
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 42vw"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
