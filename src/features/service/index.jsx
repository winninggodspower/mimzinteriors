"use client";

import Image from "next/image";
import { motion } from "motion/react";
import servicehero from "@assets/images/service/servicehero.png";
import {
  heroScaleLoop,
  sectionReveal,
} from "@features/lib/motion";
import ServiceShowcase from "@features/service/components/service-showcase";
import DesignProcess from "@features/service/components/design-process";
import QuoteSection from "@features/about/components/quote-section";

export default function Service() {
  const sectionMotion = sectionReveal({ y: 30 });

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
          <h1 className="hero-title">SERVICES</h1>
        </div>
      </motion.section>
      
      <div className="mt-10 md:mt-16 font-aref-ruqaa mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="svc-hero-caption">All images belongs to Mimz Interiors</p>
        <p className="svc-hero-description mt-6 md:mt-10 text-start">
          Our complete package of services ranges from high quality and specialized services both interior and exterior works to maintenance for both commercial and residential properties.
        </p>
      </div>

      <ServiceShowcase sectionMotion={sectionMotion} />

      <DesignProcess sectionMotion={sectionMotion} />

      <QuoteSection
        text={"Patience in dealing with clients, staff, and artisans is crucial for a smooth workflow and successful outcomes."}
        showQuoteIcon={false}
        showBtn={true}
        className="max-w-[1050px]"
        textClassName="md:text-[40px] max-w-[1050px] mx-auto"
      />

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
