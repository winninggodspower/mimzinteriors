"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import projectHero from "@assets/images/projects/projecthero.png";
import projectCatalogue from "@assets/images/projects/projectcatalogue.png";
import apartments from "@assets/images/projects/apartments.png";
import accessories from "@assets/images/projects/accessories.png";
import seperator from "@assets/images/seperator.png";
import {
  aosReveal,
  MOTION_STAGGER,
  MOTION_VIEWPORT,
  fadeUpItem,
  heroScaleLoop,
  sectionReveal,
  staggerContainer,
} from "@features/lib/motion";

const projectItems = [
  {
    title: "PROJECT CATALOG",
    desc: "Our intentional luxury projects of over Three hundred million and above, for clients able to afford foreign decor items.",
    href: "/projects/projectCatalogue",
    image: projectCatalogue,
    alt: "Project catalogue interior view",
  },
  {
    title: "APARTMENTS/SHORTLETS",
    desc: "Our Shortlet Apartments at Mimz Apartments are available for short or long staycations, available in the city of Lagos.",
    href: "/projects/apartments",
    image: apartments,
    alt: "Apartment and shortlet interior",
  },
  {
    title: "ACCESSORIES",
    desc: "Our Decor items at Mimz Homes are available for purchase in all shapes, sizes and colors. From chairs to tables and lots more..",
    href: "/projects/accessories",
    image: accessories,
    alt: "Decor accessories arranged on side table",
  },
];

export default function ProjectsFeature() {
  const sectionMotion = sectionReveal({ y: 30 });
  const cardContainer = staggerContainer(MOTION_STAGGER.wide);
  const cardItem = fadeUpItem({ y: 24 });

  return (
    <main className="prj-main">
      <motion.section className="prj-hero" {...sectionMotion}>
        <div className="prj-hero-wrap">
          <motion.div
            {...heroScaleLoop({ scale: 1.05 })}
            className="h-full w-full"
          >
            <Image
              src={projectHero}
              alt="Luxury projects by Mimz Interiors"
              fill
              priority
              className="prj-hero-img"
              sizes="100vw"
            />
          </motion.div>
          <h1 className="prj-hero-title">PROJECTS</h1>
        </div>
      </motion.section>

      <motion.section className="prj-intro" {...sectionMotion}>
        <motion.p className="prj-img-credit" {...aosReveal({ direction: "left", distance: 30, duration: 0.48 })}>-All images belongs to Mimz interiors-</motion.p>
        <motion.p className="prj-intro-copy" {...aosReveal({ direction: "right", distance: 46, duration: 0.62 })}>
          Our project speaks loudly for itself as we handle them with the highest form of professionalism, from field workers to our customer care services. All process documentation and alignments are done with modern tools to give a remarkable impression at the beginning and end of every project. At Mimz interior, we give every client a reason to come back.
        </motion.p>
      </motion.section>

      <motion.section className="prj-grid-section" {...sectionMotion}>
        <motion.div
          className="prj-grid"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION_VIEWPORT}
        >
          {projectItems.map((item, index) => (
            <motion.article className="prj-card" key={item.title} variants={cardItem}>
              <Link href={item.href} className="prj-card-image-wrap" aria-label={item.title}>
                <Image src={item.image} alt={item.alt} fill className="prj-card-image" sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </Link>
              <div className="prj-card-copy">
                <motion.h2 {...aosReveal({ direction: index % 2 === 0 ? "left" : "right", distance: 34, duration: 0.5 })}>{item.title}</motion.h2>
                <motion.p {...aosReveal({ direction: index % 2 === 0 ? "right" : "left", distance: 34, duration: 0.56 })}>{item.desc}</motion.p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section className="prj-quote" {...sectionMotion}>
        <div className="prj-quote-inner">
          <blockquote>
            We design and create spaces from residential homes to office spaces with a focus on functionality and aesthetic appeal. We are never out of style.
          </blockquote>
          <div className="prj-quote-separator" aria-hidden="true">
            <Image src={seperator} alt="" fill className="prj-quote-separator-img" sizes="(min-width: 1024px) 180px, 42vw" />
          </div>
          <motion.div {...aosReveal({ direction: "up", distance: 32, duration: 0.5 })}>
          <Link href="/contact" className="prj-cta-btn">
            GET IN TOUCH
          </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
