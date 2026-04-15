"use client";

import Image from "next/image";
import { motion } from "motion/react";
import homeHero from "@assets/images/home/homehero.png";
import quoteImage from "@assets/images/home/quoteimage.png";
import patterns from "@assets/images/patterns.svg";
import seperator from "@assets/images/seperator.png";

const revealMotion = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] },
});

const introCopyVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const introParagraphVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeFeature() {
  return (
    <main className="home-main overflow-hidden">
      <section className="relative w-full overflow-visible bg-white">
        <motion.div
          className="pointer-events-none absolute left-3 top-0 z-20 sm:left-6"
          initial={{ opacity: 0, y: -26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/AF_2024_MIMZ_AWARD_RIBBON.png"
            alt=""
            width={180}
            height={180}
            priority
            className="h-auto w-24 sm:w-28 lg:w-32"
          />
        </motion.div>
        <div className="relative h-200 w-full overflow-hidden">
          <Image
            src={homeHero}
            alt="Mimz Interiors project hero"
            fill
            priority
            className="block object-cover object-center animate-[homeHeroFloat_12s_ease-in-out_infinite_alternate] will-change-transform"
          />
        </div>
      </section>

      <motion.section className="home-intro max-md:pt-4!" {...revealMotion(0.05)}>
        <motion.p className="home-img-credit max-[480px]:text-[0.7rem]!" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          -All Images belongs to Mimz interiors-
        </motion.p>
        <motion.div className="home-intro-copy" variants={introCopyVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.p className="max-md:text-[0.9rem]! max-md:leading-[1.66]! max-[480px]:text-[0.84rem]!" variants={introParagraphVariants}>
           Mimz interior is a company specialized in architectural interior and exterior projects from start to finish, we handle both local and international project that require our design, management skills and furniture fixings for both real estate developers and personal property owners.
          </motion.p>
          <motion.p className="max-md:text-[0.9rem]! max-md:leading-[1.66]! max-[480px]:text-[0.84rem]!" variants={introParagraphVariants}>
            Mimz interior was founded in the year 2018 by Miracle Godsent Nwachukwu (Creative director). Amongst other wonderful achievement as a model, actor and fashion enthusiast , Miracle has been awarded over the years for his innovative Creation when it comes to interior design and space management. All his efforts has made mimz interior to be awarded best interior design company in the year 2021. Over the years he has made remarkable trailblazing top notch designs ideas that are universally accepted for both homes, office spaces, restaurant etc.
          </motion.p>
          <motion.p className="max-md:text-[0.9rem]! max-md:leading-[1.66]! max-[480px]:text-[0.84rem]!" variants={introParagraphVariants}>
            At mimz interior, we see through the mind of our clients, by paying attention to details, providing comfort, poise and class putting cost optimization as a great excellent value: enjoying comfort with less cost.
          </motion.p>
        </motion.div>
      </motion.section>

      <motion.section className="home-pattern" aria-hidden="true" {...revealMotion(0.08)}>
        <Image src={patterns} alt="" fill className="home-pattern-img" sizes="100vw" />
      </motion.section>

      <motion.section className="home-feature-image" {...revealMotion(0.1)}>
        <div className="home-feature-image-wrap h-175 w-full">
          <Image
            src={quoteImage}
            alt="Founder standing in a designed interior"
            fill
            className="home-feature-image-img"
            sizes="100vw"
          />
        </div>
      </motion.section>

      <motion.section className="home-quote max-[480px]:pb-[3.2rem]!" {...revealMotion(0.12)}>
        <div className="home-quote-inner">
          <blockquote className="home-quote-text max-md:text-[1.9rem]! max-[480px]:text-[1.9rem]!">
            "Interior design is my canvas, where every detail is styled to reflect my client's dreams and personality."
          </blockquote>
          <p className="home-quote-author max-md:text-[1.15rem]!">-Miracle Godsent Nwachukwu-</p>
        </div>
      </motion.section>

      <motion.section className="home-quote-separator max-[480px]:-mt-17.5!" aria-hidden="true" {...revealMotion(0.14)}>
        <div className="home-quote-separator-wrap max-[480px]:w-[min(460px,68vw)]!">
          <Image src={seperator} alt="" fill className="home-quote-separator-img" sizes="(min-width: 1024px) 520px, 55vw" />
        </div>
      </motion.section>
    </main>
  );
}
