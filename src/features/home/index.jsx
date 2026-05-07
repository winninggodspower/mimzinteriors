"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { Marquee } from "@/components/ui/marquee";
import quoteImage from "@assets/images/home/quoteimage.png";
import patterns from "@assets/images/patterns.svg";
import QuoteSection from "@features/about/components/quote-section";
import AccessoriesSection from "@features/home/components/accessories-section";
import FeaturedProjectCard from "@features/home/components/featured-project-card";
import TestimonialsSection from "@features/home/components/testimonials-section";
import { accessoriesSection, featuredProjects, heroCards, testimonials } from "@features/home/data";

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

const HERO_CARD_HOVER_SCALE = 1.3;

export default function HomeFeature() {
  const renderHeroCard = (card, { interactive = false, mobile = false } = {}) => (
    <motion.div
      key={`${mobile ? "mobile" : "desktop"}-${card.title}`}
      className={`group relative origin-center flex items-center justify-center overflow-hidden rounded-[15px] text-center shadow-[0px_4px_60px_2px_rgba(206,173,139,0.3)] backdrop-blur-md transition-shadow duration-300 ease-out ${
        card.tone === "gold"
          ? "bg-[#CEAD8B] text-white"
          : "bg-white text-black"
      } ${
        mobile
          ? "h-36 w-40 shrink-0 px-4 py-3.5"
          : "min-h-35.25 w-56.75 flex-[1_1_0%] cursor-pointer px-4 py-[1.15rem]"
      }`}
      variants={interactive ? introParagraphVariants : undefined}
      initial={interactive ? "rest" : undefined}
      animate={interactive ? "rest" : undefined}
      whileHover={interactive ? { scale: HERO_CARD_HOVER_SCALE, zIndex: 20 } : undefined}
      whileTap={interactive ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className={`flex flex-col items-center justify-center font-aref-ruqaa transition-transform duration-300 ease-out ${mobile ? "max-w-34" : "max-w-51"} ${interactive ? "group-hover:scale-[0.846154]" : ""}`}
        >
          <Icon
            icon={card.icon}
            className={`${mobile ? "h-10 w-10" : "h-8 w-8"} ${card.tone === "gold" ? "text-white" : "text-mimz-gold"}`}
            aria-hidden="true"
          />
          <span className={`${mobile ? "mt-1.5 text-[1.02rem]" : "mt-1 text-base"} leading-none uppercase tracking-[0.04em]`}>
            {card.title}
          </span>
          {mobile ? (
            <p className="mt-0 text-[0.84rem] leading-[1.35] opacity-85">
              {card.mobileDescription}
            </p>
          ) : (
            <p className="pointer-events-none h-0 text-[0.82rem] leading-[1.4] opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:h-auto">
              {card.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );

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

          <motion.div
            className="absolute left-1/2 bottom-0 z-10 hidden items-end gap-3 -translate-x-1/2 translate-y-1/2 px-3 sm:flex"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={introCopyVariants}
          >
            {heroCards.map((card) => renderHeroCard(card, { interactive: true }))}
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2 sm:hidden">
            <div className="relative flex w-full items-center justify-center overflow-hidden">
              <Marquee
                pauseOnHover
                repeat={2}
                className="w-full px-3 py-2 [--duration:22s] [--gap:1rem]"
              >
                {heroCards.map((card) => renderHeroCard(card, { mobile: true }))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-white to-transparent"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-white to-transparent"></div>
            </div>
          </div>
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
