"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import projectHero from "@assets/images/projects/projecthero.png";
import projectCatalogue from "@assets/images/projects/projectcatalogue.png";
import apartments from "@assets/images/projects/apartments.png";
import {
  aosReveal,
  sectionReveal,
} from "@features/lib/motion";
import QuoteSection from "../../about/components/quote-section";

const projectItems = [
  {
    title: "PROJECT CATALOG",
    desc: "Our intentional luxury projects of over Three hundred million and above, for clients able to afford foreign decor items.",
    href: "/projects/project_catalogue",
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
  // Accessories removed — only Projects and Apartments are shown here.
];

export default function ProjectsFeature() {
  const sectionMotion = sectionReveal({ y: 30 });

  return (
    <main className="w-full overflow-hidden">

      <motion.section className="w-full" {...sectionMotion}>
        <div className="relative h-200 w-full overflow-hidden max-md:h-172.5 max-sm:h-107.5">
          <div className="h-full w-full">
            <Image
              src={projectHero}
              alt="Luxury projects by Mimz Interiors"
              fill
              priority
              className="object-cover object-center"
              sizes="800px"
            />
          </div>
          <h1 className="hero-title">PROJECTS</h1>
        </div>
      </motion.section>

      <motion.section className="prj-intro md:pb-30!" {...sectionMotion}>
        <motion.p className="prj-img-credit" {...aosReveal({ direction: "up", distance: 20, duration: 0.5 })}>-All images belongs to Mimz interiors-</motion.p>
        <motion.p className="prj-intro-copy" {...aosReveal({ direction: "up", distance: 24, duration: 0.55, delay: 0.06 })}>
          Our project speaks loudly for itself as we handle them with the highest form of professionalism, from field workers to our customer care services. All process documentation and alignments are done with modern tools to give a remarkable impression at the beginning and end of every project. At Mimz interior, we give every client a reason to come back.
        </motion.p>
      </motion.section>

      <motion.section className="prj-grid-section" {...sectionMotion}>
        <div className="w-[min(1420px,100%)] mx-auto grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(430px,435px))] justify-center gap-[1.2rem] md:gap-[clamp(0.65rem,1.1vw,1.15rem)]">
          {projectItems.map((item, index) => (
            <Link href={item.href}  key={item.title}>
            <motion.article className="prj-card" key={item.title} {...aosReveal({ direction: "up", distance: 24, delay: 0.06 + index * 0.07 })}>
              <div className="prj-card-image-wrap" >
                  <Image src={item.image} alt={item.alt} fill className="prj-card-image" sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="prj-card-copy">
                <h2>{item.title}</h2>
                <p className="">{item.desc}</p>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>
      </motion.section>
        
      <QuoteSection
        text={'We design and create spaces from residential homes to office spaces with a focus on functionality and aesthetic appeal. We are never out of style. '}
      />

      <motion.div className="w-full text-center mb-24" {...aosReveal({ direction: "up", distance: 32, duration: 0.5 })}>
        <Link
          href="/contact"
          className="inline-flex min-h-14 items-center justify-center rounded-lg bg-[#c28831] px-7 py-3 text-[22px] leading-none font-medium tracking-[0.06em] text-white uppercase transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ab7424] hover:shadow-[0_10px_26px_rgba(171,116,36,0.28)] max-sm:min-h-12.5 max-sm:px-5 max-sm:py-2.5 max-sm:text-sm"
        >
          GET IN TOUCH
        </Link>
      </motion.div>
      
    </main>
  );
}
