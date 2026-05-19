"use client";

import Image from "next/image";
import { motion } from "motion/react";
import QuoteSection from "@features/about/components/quote-section";
import AccessoriesSection from "@features/home/components/accessories-section";
import FeaturedProjectsSection from "@features/home/components/featured-projects-section";
import HeroCardsStrip from "@features/home/components/hero-cards-strip";
import TestimonialsSection from "@features/home/components/testimonials-section";
import { accessoriesSection, testimonials } from "@features/home/data";

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
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, -1.5, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
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
              <source src="/videos/hero.webm" type="video/webm" />
              <source src="/videos/hero.mp4" type="video/mp4" />
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
      
      <FeaturedProjectsSection />

      <motion.section className="w-full bg-white " {...revealMotion(0.1)}>
          <motion.div
            className="w-full max-h-[80vh] relative"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={'/hero-quote-img.jpg'}
              alt="Founder standing in a designed interior"
              className="max-h-[85vh] w-full object-cover object-center transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </motion.div>
      </motion.section>

      <QuoteSection
        text="Designing homes, that last a lifetime."
        className="mt-[clamp(7rem,6vw,8rem)] mb-[clamp(3.5rem,6vw,4.5rem)]"
        textClassName="md:text-[60px]"
      />

      {/* <AccessoriesSection
        title={accessoriesSection.title}
        paragraphs={accessoriesSection.paragraphs}
        imageSrc={accessoriesSection.imageSrc}
        imageAlt={accessoriesSection.imageAlt}
        href={accessoriesSection.href}
      /> */}

      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
