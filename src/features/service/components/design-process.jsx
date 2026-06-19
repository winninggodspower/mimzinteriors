"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  aosReveal,
  MOTION_STAGGER,
  MOTION_VIEWPORT,
  staggerContainer,
} from "@features/lib/motion";
import { processSteps } from "@features/service/data";

const cardItem = {
  hidden: (index) => ({
    opacity: 0,
    y: 26,
    x: index % 2 === 0 ? -16 : 16,
    rotate: index % 2 === 0 ? -1.25 : 1.25,
    scale: 0.97,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardContainer = staggerContainer(MOTION_STAGGER.medium);

export default function DesignProcess({ sectionMotion }) {
  return (
    <motion.section className="bg-[#CEAD8B]/30 pt-13.5 pb-9 h-full" {...sectionMotion}>
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 ">
        <motion.h2
          className="font-caterina text-[28px] sm:text-[34px] lg:text-[40px] font-light tracking-[-0.05em] text-black uppercase mb-1"
          {...aosReveal({ direction: "up", distance: 30 })}
        >
          OUR DESIGN PROCESS
        </motion.h2>
        <motion.div
          className="svc-process-grid"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION_VIEWPORT}
        >
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              className="svc-process-card"
              variants={cardItem}
              custom={i}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              <div className="font-caterina flex items-center gap-[0.4rem] mb-3 flex-nowrap">
                <span className="font-caterina shrink-0 text-[16px] sm:text-[21px] lg:text-[24px] font-semibold text-black">{step.num}</span>
                <span className="shrink-0 text-black text-base">{"\u00B7"}</span>
                <span className="shrink-0 text-[0.9rem]">
                  <Image src={step.icon} alt="" aria-hidden="true" />
                </span>
                <span className="truncate text-[16px] sm:text-[18px] lg:text-[24px] font-light uppercase">{step.title}</span>
              </div>
              <p className="svc-process-desc">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}