"use client";

import { Icon } from "@iconify/react";
import { Marquee } from "@/components/ui/marquee";
import { motion } from "motion/react";
import { heroCards } from "@features/home/data";

const introParagraphVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const HERO_CARD_HOVER_SCALE = 1.3;

function renderHeroCard(card, { interactive = false, mobile = false } = {}) {
  return (
    <motion.div
      key={`${mobile ? "mobile" : "desktop"}-${card.title}`}
      className={`group relative origin-center flex items-center justify-center overflow-hidden rounded-[15px] text-center shadow-[0px_4px_60px_2px_rgba(206,173,139,0.3)] backdrop-blur-md transition-shadow duration-300 ease-out ${
        card.tone === "gold"
          ? "bg-[#CEAD8B] text-white"
          : "bg-white text-black"
      } ${
        mobile
          ? "h-30 w-34 shrink-0 px-3 py-2.5"
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
          className={`flex flex-col items-center justify-center font-aref-ruqaa transition-transform duration-300 ease-out ${mobile ? "max-w-28" : "max-w-51"} ${interactive ? "group-hover:scale-[0.846154]" : ""}`}
        >
          <Icon
            icon={card.icon}
            className={`${mobile ? "h-8 w-8" : "h-8 w-8"} ${card.tone === "gold" ? "text-white" : "text-mimz-gold"}`}
            aria-hidden="true"
          />
          <span className={`${mobile ? "mt-1 text-[0.9rem]" : "mt-1 text-base"} leading-none uppercase tracking-[0.04em]`}>
            {card.title}
          </span>
          {mobile ? (
            <p className="mt-0 text-[0.74rem] leading-[1.3] opacity-85">
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
}

export default function HeroCardsStrip() {
  return (
    <>
      <motion.div
        className="absolute left-1/2 bottom-0 z-10 hidden items-end gap-3 -translate-x-1/2 translate-y-1/2 px-3 sm:flex"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.16,
              delayChildren: 0.08,
            },
          },
        }}
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
        </div>
      </div>
    </>
  );
}
