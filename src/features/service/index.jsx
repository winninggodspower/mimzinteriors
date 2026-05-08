"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import servicehero from "@assets/images/service/servicehero.png";
import {
  aosReveal,
  MOTION_STAGGER,
  MOTION_VIEWPORT,
  heroScaleLoop,
  sectionReveal,
  staggerContainer,
} from "@features/lib/motion";
import HeroCardsStrip from "@features/home/components/hero-cards-strip";
import ServiceShowcase from "@features/service/components/service-showcase";
import { processSteps } from "@features/service/data";

export default function Service() {
  const sectionMotion = sectionReveal({ y: 30 });
  const cardContainer = staggerContainer(MOTION_STAGGER.medium);
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

  const quoteReveal = {
    initial: { opacity: 0, y: 20, filter: "blur(6px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
  };

  const ctaReveal = {
    initial: { opacity: 0, y: 28, scale: 0.94 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.8 },
    transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <main className="svc-main overflow-hidden">
      <motion.section className="svc-hero" {...sectionMotion}>
        <div className="relative h-200 w-full max-md:h-172.5 max-sm:h-107.5">
          <motion.div
            {...heroScaleLoop({ scale: 1.04 })}
            className="h-full w-full"
          >
            <Image
              src={servicehero}
              alt="Luxury interior design by Mimz Interiors"
              fill
              priority
              className="svc-hero-img"
            />
          </motion.div>
          <div className="svc-hero-overlay" />
          <HeroCardsStrip />
          <h1 className="hero-title">SERVICES</h1>
        </div>
      </motion.section>
      
      <div className="mt-20 font-aref-ruqaa mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="svc-hero-caption">All images belongs to Mimz Interiors</p>
        <p className="svc-hero-description mt-10 text-start">
          Our complete package of services ranges from high quality and specialized services both interior and exterior works to maintenance for both commercial and residential properties.
        </p>
      </div>

      <ServiceShowcase sectionMotion={sectionMotion} />

      <motion.section className="bg-[#CEAD8B]/30 pt-13.5 pb-9 px-[clamp(4rem,4vw,7rem)] h-full" {...sectionMotion}>
        <div className="mx-auto max-w-400 w-full ">
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
                <div className=" font-caterina flex items-center gap-[0.4rem] mb-3 flex-wrap">
                  <span className="font-caterina text-[16px] sm:text-[21px] lg:text-[24px] font-semibold text-black">{step.num}</span>
                  <span className="text-black text-base">{"\u00B7"}</span>
                  <span className="text-[0.9rem]">
                    <Image src={step.icon} alt="" aria-hidden="true" />
                  </span>
                  <span className="text-[16px] sm:text-[18px] lg:text-[24px] font-light uppercase">{step.title}</span>
                </div>
                <p className="svc-process-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="svc-philosophy" {...sectionMotion}>
        <div className="svc-philosophy-inner">
          <motion.blockquote
            className="svc-philosophy-quote leading-tight"
            {...quoteReveal}
          >
            Patience in dealing with clients, staff, and artisans is crucial for
            a smooth workflow and successful outcomes.
          </motion.blockquote>

          <motion.div
            {...aosReveal({ direction: "down", distance: 18, delay: 0.06 })}
            className="mt-1"
          >
            <Image
              src={'/mimz-mascut-seperator.png'}
              alt="seperator"
              className="svcquote-seperator"
              width={273}
              height={178}
            />
          </motion.div>

          <motion.div {...ctaReveal} className="mt-5 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[10px] bg-[#c58d2f] px-7 py-3 font-caterina text-[1.15rem] font-light uppercase tracking-[0.01em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b27d27]"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* <motion.section className="svc-gallery" {...sectionMotion}>
        <div className="svc-gallery-grid relative z-10 ">
          <motion.div
            className="svc-gallery-item"
            {...aosReveal({ direction: "up", distance: 24, delay: 0.05 })}
          >
            <Image
              src={dprocessa}
              alt="Interior design project"
              fill
              className="svc-gallery-img"
            />
            <div className="svc-gallery-overlay" />
          </motion.div>

          <motion.div
            className="svc-gallery-item max-sm:hidden"
            {...aosReveal({ direction: "up", distance: 24, delay: 0.12 })}
          >
            <Image
              src={dprocessb}
              alt="Interior design project"
              fill
              className="svc-gallery-img"
            />
            <div className="svc-gallery-overlay" />
          </motion.div>
          <motion.div
            className="svc-gallery-item max-sm:hidden"
            {...aosReveal({ direction: "up", distance: 24, delay: 0.19 })}
          >
            <Image
              src={dprocessc}
              alt="Interior design project"
              fill
              className="svc-gallery-img"
            />
            <div className="svc-gallery-overlay" />
          </motion.div>
        </div>
        <div className="relative w-full min-h-14">
          <Image
            src={patterns}
            alt=""
            className="absolute object-cover w-full max-sm:h-[-webkit-fill-available] inset-x-0 inset-y-0 -translate-y-1/2 z-0"
            sizes="100vw"
          />
        </div>
      </motion.section> */}

    </main>
  );
}
