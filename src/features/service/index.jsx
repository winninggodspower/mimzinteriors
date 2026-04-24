"use client";

import Image from "next/image";
import { motion } from "motion/react";
import servicehero from "@assets/images/service/servicehero.png";
import dprocessa from "@assets/images/service/dprocessa.png";
import dprocessb from "@assets/images/service/dprocessb.png";
import dprocessc from "@assets/images/service/dprocessc.png";
import seperator from "@assets/images/seperator.png";
import patterns from "@assets/images/patterns.svg";
import {
  aosReveal,
  MOTION_STAGGER,
  MOTION_VIEWPORT,
  fadeUpItem,
  heroScaleLoop,
  sectionReveal,
  staggerContainer,
} from "@features/lib/motion";
import { processSteps, services } from "@features/service/data";

export default function Service() {
  const sectionMotion = sectionReveal({ y: 30 });
  const cardContainer = staggerContainer(MOTION_STAGGER.medium);
  const cardItem = fadeUpItem({ y: 22 });

  return (
    <main className="svc-main overflow-hidden">
      <motion.section className="svc-hero" {...sectionMotion}>
        <div className="relative h-200 w-full overflow-hidden max-md:h-172.5 max-sm:h-107.5">
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
          <h1 className="hero-title">SERVICES</h1>
        </div>
      </motion.section>
      <p className="svc-hero-caption">All images belongs to Mimz Interiors</p>

      <motion.section className="svc-headline" {...sectionMotion}>
        <div className="svc-headline-inner">
          <motion.h1
            className="svc-headline-title"
            {...aosReveal({ direction: "up", distance: 34 })}
          >
            Your Space Designed For Now And The Future.
          </motion.h1>
          <motion.p
            className="svc-headline-sub"
            {...aosReveal({ direction: "up", distance: 30, delay: 0.08 })}
          >
            Our complete package of services ranges from high quality and
            specialized services both interior and exterior works to maintenance
            for both commercial and residential properties.
          </motion.p>
        </div>
      </motion.section>

      <motion.section className="svc-offer" {...sectionMotion}>
        <div className="svc-offer-inner">
          <motion.h2
            className="svc-offer-title"
            {...aosReveal({ direction: "up", distance: 30 })}
          >
            SERVICES WE OFFER.
          </motion.h2>
          <div className="svc-offer-grid">
            {services.map((item, i) => (
              <motion.div
                key={i}
                className="svc-offer-item"
                {...aosReveal({
                  direction: "up",
                  distance: 22,
                  delay: i * 0.03,
                })}
              >
                <span className="svc-offer-bullet">{"\u25C6"}</span>
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section className="svc-philosophy" {...sectionMotion}>
        <div className="svc-philosophy-inner">
          <motion.blockquote
            className="svc-philosophy-quote"
            {...aosReveal({ direction: "up", distance: 32 })}
          >
            Patience in dealing with clients, staff, and artisans is crucial for
            a smooth workflow and successful outcomes.
          </motion.blockquote>
          <Image 
            src={'/mimz-mascut-seperator.png'} 
            alt="seperator" 
            className="svcquote-seperator" 
            width={273}
            height={178}
          />
        </div>
      </motion.section>

      <motion.section className="svc-gallery" {...sectionMotion}>
        <div className="svc-gallery-grid">
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
            className="svc-gallery-item"
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
            className="svc-gallery-item"
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
        <div className="svc-gallery-pattern-wrap">
          <Image
            src={patterns}
            alt=""
            fill
            className="svc-gallery-pattern"
            sizes="100vw"
          />
        </div>
      </motion.section>

      <motion.section className="svc-process" {...sectionMotion}>
        <div className="svc-process-inner">
          <motion.h2
            className="svc-process-title"
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
              >
                <div className="svc-process-header">
                  <span className="svc-process-num">{step.num}</span>
                  <span className="svc-process-sep">{"\u00B7"}</span>
                  <span className="svc-process-icon">
                    <Image src={step.icon} alt="" aria-hidden="true" />
                  </span>
                  <span className="svc-process-step-title">{step.title}</span>
                </div>
                <p className="svc-process-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
