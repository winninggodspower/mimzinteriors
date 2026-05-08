"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import quoteImage from "@assets/images/home/quoteimage.png";
import patterns from "@assets/images/patterns.svg";
import QuoteSection from "@features/about/components/quote-section";
import AccessoriesSection from "@features/home/components/accessories-section";
import FeaturedProjectCard from "@features/home/components/featured-project-card";
import HeroCardsStrip from "@features/home/components/hero-cards-strip";
import TestimonialsSection from "@features/home/components/testimonials-section";
import { accessoriesSection, featuredProjects, testimonials } from "@features/home/data";

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

export default function HomeFeature() {
  return (
    <main className="w-full overflow-x-visible bg-white text-black">
      <section className="relative w-full overflow-visible bg-white pb-16 ">
        <motion.div
          className="pointer-events-none absolute left-3 top-0 z-20 sm:left-6"
          initial={{ opacity: 0, y: -26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="absolute inset-0 overflow-hidden">
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
          </div>

          <HeroCardsStrip />
        </div>
      </section>

      <motion.section className="home-intro mt-6" {...revealMotion(0.05)}>
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

      <motion.section className="w-full bg-white relative" {...revealMotion(0.1)}>
        <Image 
          src={patterns} alt="" 
          className="object-cover h-full w-full  inset-x-0 top-0 z-0 translate-y-1/2" 
          sizes="100vw" 
        />
        <div className="group relative h-125 w-full overflow-hidden">
          <Image
            src={quoteImage}
            alt="Founder standing in a designed interior"
            fill
            className="object-cover object-center transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            sizes="100vw"
          />
        </div>
      </motion.section>

      <QuoteSection
        text="Interior design is my canvas, where every detail is styled to reflect my client's dreams and personality."
        author="Miracle Godsent Nwachukwu"
        showIcon={false}
        className="py-[clamp(4rem,6vw,7rem)]"
      />

      <motion.section
        className="bg-white px-6 pb-20 sm:px-8 lg:px-10"
        {...revealMotion(0.12)}
      >
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-caterina text-[1.9rem] leading-none uppercase text-[#161616] sm:text-[2.2rem]">
            Featured Projects
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard
                key={`${project.title}-${project.image.src}`}
                title={project.title}
                date={project.date}
                image={project.image}
                href={project.href}
              />
            ))}
          </div>

          <Link
            href="/projects/project_catalogue"
            className="mt-8 inline-flex min-w-28 items-center justify-center rounded-[8px] bg-[#cb912d] px-6 py-3 font-aref-ruqaa text-[1rem] leading-none uppercase text-white transition-colors duration-200 hover:bg-[#b88024]"
          >
            View More
          </Link>
        </div>
      </motion.section>

      <AccessoriesSection
        title={accessoriesSection.title}
        paragraphs={accessoriesSection.paragraphs}
        imageSrc={accessoriesSection.imageSrc}
        imageAlt={accessoriesSection.imageAlt}
        href={accessoriesSection.href}
      />

      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
