"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Icon  } from "@iconify/react";
import { aosReveal } from "@features/lib/motion";
import { serviceShowcase } from "@features/service/data";

const showcaseItem = {
  hidden: (index) => ({
    opacity: 0,
    y: 20,
    x: index % 2 === 0 ? -14 : 14,
    rotate: index % 2 === 0 ? -0.7 : 0.7,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageReveal = {
  initial: { opacity: 0, scale: 1.06,  },
  whileInView: { opacity: 1, scale: 1,  },
  viewport: { once: true, amount: 0.45 },
  transition: { duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
};

export default function ServiceShowcase({ sectionMotion }) {
  const slides = serviceShowcase.slides;
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const wrapTimerRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (wrapTimerRef.current) {
        window.clearTimeout(wrapTimerRef.current);
      }

      if (autoplayTimerRef.current) {
        window.clearTimeout(autoplayTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSliding) return;

    if (autoplayTimerRef.current) {
      window.clearTimeout(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = window.setTimeout(() => {
      goToNextSlide();
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) {
        window.clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, isSliding]);

  const trackSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const activeSlideIndex = (currentIndex - 1 + slides.length) % slides.length;
  const currentSlide = slides[activeSlideIndex];

  const goToPreviousSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((index) => index - 1);
  };

  const goToNextSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((index) => index + 1);
  };

  const handleTrackTransitionEnd = () => {
    if (currentIndex === 0) {
      wrapTimerRef.current = window.setTimeout(() => {
        setCurrentIndex(slides.length);
        setIsSliding(false);
      }, 900);
      return;
    }

    if (currentIndex === slides.length + 1) {
      wrapTimerRef.current = window.setTimeout(() => {
        setCurrentIndex(1);
        setIsSliding(false);
      }, 900);
      return;
    }

    setIsSliding(false);
  };

  return (
    <motion.section
      className=""
      {...sectionMotion}
    >
      <div className="mx-auto grid max-w-7xl items-start gap-16 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_minmax(320px,1fr)] lg:pt-16 lg:pb-28">
        <div className="pt-1">
          <motion.h2
            className="mb-4 font-caterina text-[clamp(2.1rem,4vw,3.1rem)] font-light uppercase leading-[0.95] tracking-[-0.03em] text-[#111]"
            initial={{ opacity: 0, x: -24, skewX: -4 }}
            whileInView={{ opacity: 1, x: 0, skewX: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {serviceShowcase.title}
          </motion.h2>

          <motion.p
            className="mb-7 text-[clamp(0.98rem,1.05vw,1.08rem)] leading-[1.9] text-black"
            {...aosReveal({ direction: "up", distance: 18, delay: 0.05 })}
          >
            {serviceShowcase.intro}
          </motion.p>

          <div className="grid gap-4">
            {serviceShowcase.items.map((item, index) => (
              <motion.article
                key={item.title}
                className="pb-1"
                variants={showcaseItem}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.45 }}
                whileHover={{ x: 3, transition: { duration: 0.2 } }}
              >
                <motion.h3
                  className="mb-1.5 inline-flex w-fit font-aref-ruqaa text-base font-normal leading-4 text-black uppercase [-webkit-text-stroke:0.3px_black]"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.45, delay: 0.06 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="m-0 text-[clamp(0.9rem,0.95vw,1rem)] leading-[1.65] text-black"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.description}
                </motion.p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="group relative w-full max-w-112.5 justify-self-center bg-white lg:justify-self-start"
          {...imageReveal}
        >
          <div className="relative aspect-478/580 w-full overflow-hidden md:h-150 lg:aspect-auto">
            <div
              className="flex h-full w-full"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {trackSlides.map((slide, index) => (
                <div key={`${slide.title}-${index}`} className="relative h-full w-full shrink-0">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority={index === 1}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 border-t px-4 py-4 sm:px-6 sm:py-5 lg:px-7 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Show previous image"
              disabled={isSliding}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#111] transition-colors duration-200 hover:text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icon icon="weui:arrow-filled" className="h-7 w-7 rotate-180" aria-hidden="true" />
            </button>

            <motion.h3
              key={`title-${currentSlide.title}`}
              className="font-aref-ruqaa text-xl md:text-2xl font-light capitalize tracking-[-0.03em] text-[#111]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentSlide.title}
            </motion.h3>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Show next image"
              disabled={isSliding}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#111] transition-colors duration-200 hover:text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Icon icon="weui:arrow-filled" className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
