"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { aosReveal, sectionReveal } from "@features/lib/motion";
import roots from "@assets/images/roots.png";

import aboutgallerya from "@assets/images/about/aboutgallerya.png";
import aboutgalleryb from "@assets/images/about/aboutgalleryb.png";
import aboutgalleryc from "@assets/images/about/aboutgalleryc.png";
import ivision from "@assets/images/icons/ivision.svg";
import imission from "@assets/images/icons/imision.svg";
import patterns from "@assets/images/patterns.svg";

import activitya from "@assets/images/about/activity-1.jpg";
import activityb from "@assets/images/about/activity-2.jpg";
import activityc from "@assets/images/about/activity-3.jpg";

import thefirm from "@assets/images/thefirm.png";
import mimza from "@assets/images/mimza.png";
import mimzb from "@assets/images/mimzb.png";
import sawarda from "@assets/images/sawarda.png";
import sawardb from "@assets/images/sawardb.png";
import sawardc from "@assets/images/sawardc.png";
import aboutteam from "@assets/images/about/about-team.jpg";
import { aboutContent } from "./data";
import QuoteSection from "./components/quote-section";

export default function AboutPage() {
  const sectionMotion = sectionReveal({ y: 28 });

  return (
    <main className="about-main">

      {/* ── ROOTS SECTION ───────────────────────────────── */}
      <motion.section className="about-roots" {...sectionMotion}>
        <div className="about-roots-inner">
          <div className="about-roots-image">
            <div className="about-roots-img-wrap">
              <Image
                src={roots}
                alt="Mimz Ferunmise — Interior Designer"
                fill
                className="about-img"
                sizes="(min-width: 1200px) 33vw, (min-width: 768px) 45vw, 100vw"
              />
            </div>
          </div>

          <div className="about-roots-content" >
            <motion.h2 className="about-section-label" {...aosReveal({ direction: "left", distance: 30 })}>
              {aboutContent.roots.title}
            </motion.h2>
            <motion.div {...aosReveal({ direction: "right", distance: 34, delay: 0.06 })}>
              {aboutContent.roots.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-body-paragraph mb-1">{paragraph}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── QUOTE SECTION ───────────────────────────────── */}
      <QuoteSection
        text={aboutContent.quoteSection.text}
        author={aboutContent.quoteSection.author}
      />

      {/* ── GALLERY ROW ─────────────────────────────────── */}
      {/* will make this a carousel later, for now just a grid of images */}
      <motion.section className="about-gallery-row" {...sectionMotion}>
        <div className="about-gallery-grid">
          <motion.div className="about-gallery-item" {...aosReveal({ direction: "up", distance: 26, delay: 0.04 })}>
            <Image
              src={aboutgallerya}
              alt="Interior project"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
          <motion.div className="about-gallery-item" {...aosReveal({ direction: "up", distance: 26, delay: 0.1 })}>
            <Image
              src={aboutgalleryb}
              alt="Interior project"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
          <motion.div className="about-gallery-item" {...aosReveal({ direction: "up", distance: 26, delay: 0.16 })}>
            <Image
              src={aboutgalleryc}
              alt="Interior project"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ── VISION SECTION ──────────────────────────────── */}
      <motion.section className="px-6 my-20 md:mt-36 md:mb-32 sm:px-12 lg:px-[clamp(1.5rem,6vw,7rem)]" {...sectionMotion}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-[clamp(2rem,5vw,5rem)] md:grid-cols-2">
          <motion.div className="about-vision-card" {...aosReveal({ direction: "up", distance: 30, delay: 0.1 })}>
            <div className="about-vision-head">
              <Image src={ivision} alt="vision icon" className="about-vision-icon" />
              <h3 className="about-vision-label">{aboutContent.vision.items[0].title}</h3>
            </div>
            <p className="about-vision-text">
              {aboutContent.vision.items[0].text}
            </p>
          </motion.div>

          <motion.div className="about-vision-card" {...aosReveal({ direction: "up", distance: 30, delay: 0.25 })}>
            <div className="about-vision-head">
              <Image src={imission} alt="mission icon" className="about-vision-icon" />
              <h3 className="about-vision-label">{aboutContent.vision.items[1].title}</h3>
            </div>
            <p className="about-vision-text">
              {aboutContent.vision.items[1].text}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ── VISION GALLERY ──────────────────────────────── */}
      {/* convert to a carousel later */}
      <motion.section className="about-vision-gallery" {...sectionMotion}>
        <div className="grid grid-cols-3 gap-[clamp(3px,0.35vw,6px)] max-md:grid-cols-1">
          <motion.div className="about-vision-gallery-item" {...aosReveal({ direction: "up", distance: 24, delay: 0.06 })}>
            <Image
              src={activitya}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
          <motion.div className="about-vision-gallery-item" {...aosReveal({ direction: "up", distance: 24, delay: 0.13 })}>
            <Image
              src={activityb}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
          <motion.div className="about-vision-gallery-item" {...aosReveal({ direction: "up", distance: 24, delay: 0.2 })}>
            <Image
              src={activityc}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ── THE FIRM SECTION ────────────────────────────── */}
      <section className="about-firm mt-20 md:mt-28 lg:mt-32">
        <div className="about-firm-inner">
          <motion.div className="about-firm-content" {...aosReveal({ direction: "left", distance: 36 })}>
            <motion.h2 className="about-section-label" {...aosReveal({ direction: "left", distance: 28 })}>
              {aboutContent.firm.title}
            </motion.h2>
            <motion.div {...aosReveal({ direction: "right", distance: 30, delay: 0.06 })}>
              {aboutContent.firm.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-body-paragraph last:mb-0">{paragraph}</p>
              ))}
            </motion.div>
          </motion.div>

          <div className="about-firm-image">
            <div className="about-firm-img-wrap">
              <Image
                src={thefirm}
                alt="Mimz Interiors showroom"
                fill
                className="about-img"
                sizes="(min-width: 1200px) 34vw, (min-width: 768px) 45vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM PHOTO ──────────────────────────────────── */}
      <motion.section className="about-team relative" {...sectionMotion}>
        <div className="absolute inset-x-0 top-0 z-0 translate-y-1/2" aria-hidden="true">
          <Image
            src={patterns}
            alt=""
            className="w-full object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-1 h-145 w-full overflow-hidden mx-auto">
          <Image
            src={aboutteam}
            alt="Mimz Interiors team"
            fill
            className="about-img object-top"
          />
          <div className="about-team-overlay" />
        </div>
      </motion.section>

      {/* ── AWARDS SECTION ──────────────────────────────── */}
      <motion.section className="px-[clamp(1.5rem,6vw,7rem)] py-[clamp(4rem,8vw,7rem)]" {...sectionMotion}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-4 lg:mx-40 lg:grid-cols-[auto_1fr] lg:gap-10 ">

          <div className="order-2 flex w-72 md:w-83 mx-auto flex-col justify-items-normal justify-center gap-4 lg:order-0 lg:w-auto">
            
            {/* two awards badges */}
            <div className="flex items-start justify-between mt-10 md:mt-0 ">
              <div className="group flex items-center justify-center ">
                <Image
                  src={mimza}
                  alt="African Property Awards — Best Interior Design"
                  width={186}
                  height={750}
                  className="about-award-primary-badge"
                />
              </div>
              <div className="group flex items-center justify-center">
                <Image
                  src={mimzb}
                  alt="African Property Awards — Interior Design"
                  width={186}
                  height={750}
                  className="about-award-primary-badge"
                />
              </div>
            </div>

            {/* three certificate badges */}
            <div className="flex w-full items-center justify-center -space-x-3 max-sm:-space-x-2">
              <div className="group flex w-[calc((100%+1.5rem)/3)] shrink-0 items-center justify-center max-sm:w-[calc((100%+1rem)/3)]">
                <Image
                  src={sawarda}
                  alt="Laufen Award"
                  width={100}
                  height={100}
                  className="h-auto w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="group flex w-[calc((100%+1.5rem)/3)] shrink-0 items-center justify-center max-sm:w-[calc((100%+1rem)/3)]">
                <Image
                  src={sawardb}
                  alt="Roca Award"
                  width={100}
                  height={100}
                  className="h-auto w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="group flex w-[calc((100%+1.5rem)/3)] shrink-0 items-center justify-center max-sm:w-[calc((100%+1rem)/3)]">
                <Image
                  src={sawardc}
                  alt="Roca Award"
                  width={100}
                  height={100}
                  className="h-auto w-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </div>

          <div className="about-awards-content">
            <motion.h2 className="about-section-label" {...aosReveal({ direction: "right", distance: 26 })}>
              {aboutContent.awards.title}
            </motion.h2>
            <motion.div {...aosReveal({ direction: "left", distance: 30, delay: 0.06 })}>
              {aboutContent.awards.paragraphs.map((paragraph, index) => (
                <p key={paragraph} className={
                  `about-body-paragraph ${index === aboutContent.awards.paragraphs.length - 1 ? 'last:mb-0' : 'mb-4'}
                  `}>
                  {paragraph}
                </p>
              ))}
            </motion.div>
            <motion.blockquote className="about-awards-quote" {...aosReveal({ direction: "up", distance: 24, delay: 0.08 })}>
              "{aboutContent.awards.quote}"
            </motion.blockquote>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
