"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { aosReveal, sectionReveal } from "@features/lib/motion";
import roots from "@assets/images/roots.png";
import aboutgallerya from "@assets/images/aboutgallerya.png";
import aboutgalleryb from "@assets/images/aboutgalleryb.png";
import aboutgalleryc from "@assets/images/aboutgalleryc.png";
import ivision from "@assets/images/ivision.png";
import imission from "@assets/images/imission.png";
import patterns from "@assets/images/patterns.svg";
import visiona from "@assets/images/visiona.png";
import visionb from "@assets/images/visionb.png";
import visionc from "@assets/images/visionc.png";
import thefirm from "@assets/images/thefirm.png";
import mimza from "@assets/images/mimza.png";
import mimzb from "@assets/images/mimzb.png";
import sawarda from "@assets/images/sawarda.png";
import sawardb from "@assets/images/sawardb.png";
import sawardc from "@assets/images/sawardc.png";
import aboutteam from "@assets/images/aboutteam.png";
import { aboutContent } from "./data";

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

          <motion.div className="about-roots-content" {...aosReveal({ direction: "right", distance: 42 })}>
            <motion.h2 className="about-section-label" {...aosReveal({ direction: "right", distance: 30 })}>
              {aboutContent.roots.title}
            </motion.h2>
            <motion.div className="about-roots-body" {...aosReveal({ direction: "left", distance: 34, delay: 0.06 })}>
              {aboutContent.roots.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── QUOTE SECTION ───────────────────────────────── */}
      <motion.section className="py-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,8vw,10rem)] border-b border-[rgba(201,169,110,0.25)]" {...sectionMotion}>
        <div className="mx-auto max-w-225 text-center">
          <div className="flex flex-col items-center">
            <motion.blockquote className="m-0 border-none bg-none p-0 font-bd-megalona text-[48px] font-normal italic leading-none text-black max-[1024px]:text-[40px] max-[768px]:text-[32px] max-[480px]:text-[26px]" {...aosReveal({ direction: "up", distance: 32 })}>
              <span className="mr-[0.1em] align-[-0.1em] text-[clamp(2rem,5vw,3.5rem)] font-normal leading-0 text-black">"</span>
              {aboutContent.quoteSection.text}
              <span className="ml-[0.1em] align-[-0.1em] text-[clamp(2rem,5vw,3.5rem)] font-normal leading-0 text-black">"</span>
            </motion.blockquote>
            <motion.div className="flex justify-center -mt-8" {...aosReveal({ direction: "up", distance: 20, delay: 0.25 })}>
              <Image
                src={'/mimz-mascut-seperator.png'}
                alt="seperator image"
                height={178}
                width={273}
                className="h-44.5 w-68.25 max-[768px]:h-auto max-[768px]:w-56 max-[480px]:w-44"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

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
      <motion.section className="px-6 py-[clamp(3.5rem,7vw,6rem)] sm:px-12 lg:px-[clamp(1.5rem,6vw,7rem)]" {...sectionMotion}>
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
        <div className="about-vision-gallery-grid">
          <motion.div className="about-vision-gallery-item" {...aosReveal({ direction: "up", distance: 24, delay: 0.06 })}>
            <Image
              src={visiona}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
          <motion.div className="about-vision-gallery-item" {...aosReveal({ direction: "up", distance: 24, delay: 0.13 })}>
            <Image
              src={visionb}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
          <motion.div className="about-vision-gallery-item" {...aosReveal({ direction: "up", distance: 24, delay: 0.2 })}>
            <Image
              src={visionc}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ── THE FIRM SECTION ────────────────────────────── */}
      <motion.section className="about-firm" {...sectionMotion}>
        <div className="about-firm-inner">
          <motion.div className="about-firm-content" {...aosReveal({ direction: "left", distance: 36 })}>
            <motion.h2 className="about-section-label" {...aosReveal({ direction: "left", distance: 28 })}>
              {aboutContent.firm.title}
            </motion.h2>
            <motion.div className="about-firm-body" {...aosReveal({ direction: "right", distance: 30, delay: 0.06 })}>
              {aboutContent.firm.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
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
      </motion.section>

      {/* ── TEAM PHOTO ──────────────────────────────────── */}
      <motion.section className="about-team" {...sectionMotion}>
        <div className="about-team-pattern-wrap" aria-hidden="true">
          <Image
            src={patterns}
            alt=""
            fill
            className="about-team-pattern"
            sizes="100vw"
          />
        </div>
        <div className="about-team-img-wrap">
          <Image
            src={aboutteam}
            alt="Mimz Interiors team"
            fill
            className="about-img about-team-img"
          />
          <div className="about-team-overlay" />
        </div>
      </motion.section>

      {/* ── AWARDS SECTION ──────────────────────────────── */}
      <motion.section className="about-awards" {...sectionMotion}>
        <div className="about-awards-inner">
          <div className="about-awards-badges">
            <div className="about-awards-badges-top">
              <div className="group flex items-center justify-center">
                <Image
                  src={mimza}
                  alt="African Property Awards — Best Interior Design"
                  width={180}
                  height={750}
                  className="h-auto w-auto object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="group flex items-center justify-center">
                <Image
                  src={mimzb}
                  alt="African Property Awards — Interior Design"
                  width={180}
                  height={750}
                  className="h-auto w-auto object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>
            <div className="about-awards-badges-bottom">
              <div className="group flex items-center justify-center">
                <Image
                  src={sawarda}
                  alt="Laufen Award"
                  width={100}
                  height={100}
                  className="h-auto w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="group flex items-center justify-center">
                <Image
                  src={sawardb}
                  alt="Roca Award"
                  width={100}
                  height={100}
                  className="h-auto w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className="group flex items-center justify-center">
                <Image
                  src={sawardc}
                  alt="Roca Award"
                  width={100}
                  height={100}
                  className="h-auto w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out group-hover:scale-[1.04]"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>
          </div>

          <motion.div className="about-awards-content" {...aosReveal({ direction: "right", distance: 34 })}>
            <motion.h2 className="about-section-label" {...aosReveal({ direction: "right", distance: 26 })}>
              {aboutContent.awards.title}
            </motion.h2>
            <motion.div className="about-awards-body" {...aosReveal({ direction: "left", distance: 30, delay: 0.06 })}>
              {aboutContent.awards.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
            <motion.blockquote className="about-awards-quote" {...aosReveal({ direction: "up", distance: 24, delay: 0.08 })}>
              "{aboutContent.awards.quote}"
            </motion.blockquote>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
