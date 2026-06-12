"use client";

import Image from "next/image";
import { motion } from "motion/react";
import QuoteSection from "@features/about/components/quote-section";
import FeaturedProjectsSection from "@features/home/components/featured-projects-section";
import HeroCardsStrip from "@features/home/components/hero-cards-strip";
import TestimonialsSection from "@features/home/components/testimonials-section";
import { testimonials } from "@features/home/data";

const revealMotion = (delay = 0) => ({
  initial: { opacity: 0, y: 44, scale: 0.985 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] },
});

const introSectionVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    clipPath: "inset(0 0 22% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

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
  hidden: { opacity: 0, y: 18, x: -10, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomeFeature() {
  return (
    <main className="w-full overflow-x-visible bg-white text-black">
      <section className="relative w-full overflow-visible bg-white pb-16 ">
        <motion.div
          className="pointer-events-none absolute left-3 top-0 z-20 sm:left-6"
          initial={{ opacity: 0, y: -36, rotate: -5, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/BEST-01.png"
            alt=""
            width={180}
            height={180}
            priority
            className="h-auto w-16 sm:w-24 lg:w-32"
          />
        </motion.div>
        <div className="relative h-125 sm:h-150 lg:h-175 w-full overflow-visible">
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ scale: 1.08, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Poster image (fallback / loading) */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/hero.png"
              className="
                absolute inset-0 h-full w-full 
                object-cover object-center 
                z-0
                will-change-transform
              "
            >
              <source src="/videos/web_hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          <HeroCardsStrip />
        </div>
      </section>

      <motion.section
        className="home-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={introSectionVariants}
      >
        <motion.p
          className="home-img-credit max-[480px]:text-[0.7rem]!"
          initial={{ opacity: 0, y: 14, letterSpacing: "0.18em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.08em" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          -All Images belongs to Mimz interiors-
        </motion.p>
        <motion.div className="max-w-7xl mx-auto mt-[clamp(2rem,4vw,3rem)] space-y-1" variants={introCopyVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <motion.p className="m-0 text-base leading-[1.72] text-black max-md:text-[0.9rem]! max-md:leading-[1.66]! max-[480px]:text-[0.84rem]!" variants={introParagraphVariants}>
            Welcome to Mimz Interiors, where timeless design meets spaces created to last a lifetime. For over eight years, we have been transforming homes into beautiful, functional, and deeply personal environments that reflect the unique lifestyles of our clients.
          </motion.p>
          <motion.p className="m-0 text-base leading-[1.72] text-black max-md:text-[0.9rem]! max-md:leading-[1.66]! max-[480px]:text-[0.84rem]!" variants={introParagraphVariants}>
            At Mimz Interiors, we believe great design goes beyond aesthetics. It is about creating spaces that inspire comfort, elevate everyday living, and stand the test of time. Drawing inspiration from world-class interior design trends and adapting them to suit the modern African lifestyle, we deliver interiors that are elegant, intentional, and unforgettable.
          </motion.p>
          <motion.p className="m-0 text-base leading-[1.72] text-black max-md:text-[0.9rem]! max-md:leading-[1.66]! max-[480px]:text-[0.84rem]!" variants={introParagraphVariants}>
            From concept development to the finest finishing details, every project is approached with creativity, precision, and an unwavering commitment to excellence. Whether you are building a new home, renovating an existing space, or seeking bespoke furnishings and décor, our goal remains the same: to create exceptional spaces that tell your story and enrich the way you live. <br />
            Welcome to a world of timeless design.
          </motion.p>
        </motion.div>
      </motion.section>
      
      <FeaturedProjectsSection />

      <motion.section
        className="w-full bg-white"
        {...revealMotion(0.1)}
      >
        <motion.div
          className="relative w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* IMAGE */}
          <img
            src="/hero-quote-img.jpg"
            alt="Founder standing in a designed interior"
            className="h-[85vh] w-full object-cover object-center"
          />

          {/* DARK + WARM OVERLAY */}
          <div className="absolute inset-0 bg-black/47" />

          {/* CENTER CONTENT */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              {/* QUOTE */}
              <blockquote
                className="p-0 font-bd-megalona text-[26px] font-normal italic leading-none text-white sm:text-[42px] md:text-[60px]"
              >
                <span className="mr-[0.1em] align-[-0.1em] text-[clamp(2rem,5vw,3.5rem)] font-normal">
                  "
                </span>
                Designing homes, that last a lifetime.
                <span className="ml-[0.1em] align-[-0.1em] text-[clamp(2rem,5vw,3.5rem)] font-normal">
                  "
                </span>
              </blockquote>
              {/* faint logo behind  */}
              <div
                className="flex justify-center -mt-8"
              >
                <Image
                  src="/mimz-mascut-seperator.png"
                  alt="separator image"
                  height={178}
                  width={273}
                  className="h-auto w-44 sm:w-56 md:w-68.25"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
