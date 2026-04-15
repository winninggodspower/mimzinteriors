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
import seperator from "@assets/images/seperator.png"
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
              ROOTS.
            </motion.h2>
            <motion.div className="about-roots-body" {...aosReveal({ direction: "left", distance: 34, delay: 0.06 })}>
              <p>
                Miracle Nwachukwu is an award-winning interior decorator, fashion enthusiast, and a dedicated mentor. As the founder and visionary behind a multiple award-winning interior design company, Miracle has established a reputation for excellence in the industry. His work has garnered significant recognition, including a recent prestigious accolade from the Africa Property Awards for Interior Design. Known for his creative flair and commitment to inspiring the next generation, Miracle continues to redefine interior design and mentorship with each project he undertakes.              
              </p>
              <p>
                From mastering the art of selecting the perfect shoes to compliment an outfit, to becoming Nigeria’s leading globally recognized interior designer, Miracle Nwachukwu’s journey reflects a keen sense of style, creativity, and dedication.
              </p>
              <p>
                In his early days as an undergraduate, Miracle Nwachukwu demonstrated exceptional ability in balancing academic excellence, fashion, and business. His passion for travel has further enriched his design perspective, enabling him to gain valuable insights into diverse cultures, art forms, and architectural styles around the world. This global exposure has played a pivotal role in his success as an international interior designer. Over the past five years, his designs have consistently stood out for their innovation and sophistication.                
              </p>
              <p>
                Miracle’s personality and commitment to his craft can be summed up in three words: classy, unique, and impactful. His unwavering dedication to creating timeless, memorable spaces has earned him recognition and respect in the interior design industry.                
              </p>
              <p>
                "Having successfully completed over 200 projects and earned the trust of more than 64,000 followers across Nigeria and globally, Mimz has built a reputation for excellence and unwavering client satisfaction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── QUOTE SECTION ───────────────────────────────── */}
      <motion.section className="about-quote-section" {...sectionMotion}>
        <div className="about-quote-inner">
          <motion.blockquote className="about-quote" {...aosReveal({ direction: "up", distance: 32 })}>
            <span className="about-quote-mark about-quote-open">"</span>
            Seeing the genuine satisfaction on my clients' faces after every
            project is my greatest source of motivation.
            <span className="about-quote-mark about-quote-close">"</span>
          </motion.blockquote>
          <div className=" seperator">
            <Image
              src={seperator}
              alt="seperator image"
              height={178}
              width={273}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      </motion.section>

      {/* ── GALLERY ROW ─────────────────────────────────── */}
      {/* will make this a carousel later, for now just a grid of images */}
      <motion.section className="about-gallery-row" {...sectionMotion}>
        <div className="about-gallery-grid">
          <div className="about-gallery-item">
            <Image
              src={aboutgallerya}
              alt="Interior project"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="about-gallery-item">
            <Image
              src={aboutgalleryb}
              alt="Interior project"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="about-gallery-item">
            <Image
              src={aboutgalleryc}
              alt="Interior project"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="about-gallery-item">
            <Image
              src={aboutgallerya}
              alt="Interior project"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </motion.section>

      {/* ── VISION SECTION ──────────────────────────────── */}
      <motion.section className="px-6 py-[clamp(3.5rem,7vw,6rem)] sm:px-12 lg:px-[clamp(1.5rem,6vw,7rem)]" {...sectionMotion}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-[clamp(2rem,5vw,5rem)] md:grid-cols-2">
          <motion.div className="about-vision-card" {...aosReveal({ direction: "up", distance: 30, delay: 0.1 })}>
            <div className="about-vision-head">
              <Image src={ivision} alt="vision icon" className="about-vision-icon" />
              <h3 className="about-vision-label">VISION</h3>
            </div>
            <p className="about-vision-text">
              To provide the best solution for customers who look for originality and unparalleled quality, through our continuous effort in innovation and creativity.
            </p>
          </motion.div>

          <motion.div className="about-vision-card" {...aosReveal({ direction: "up", distance: 30, delay: 0.25 })}>
            <div className="about-vision-head">
              <Image src={imission} alt="mission icon" className="about-vision-icon" />
              <h3 className="about-vision-label">MISION</h3>
            </div>
            <p className="about-vision-text">
              To design and create spaces that generate positive vibes, be it the warmth of a home, or the professional ambience of a workspace.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ── VISION GALLERY ──────────────────────────────── */}
      {/* convert to a carousel later */}
      <motion.section className="about-vision-gallery" {...sectionMotion}>
        <div className="about-vision-gallery-grid">
          <div className="about-vision-gallery-item">
            <Image
              src={visiona}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="about-vision-gallery-item">
            <Image
              src={visionb}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="about-vision-gallery-item">
            <Image
              src={visionc}
              alt="Design vision"
              fill
              className="about-img"
              sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </motion.section>

      {/* ── THE FIRM SECTION ────────────────────────────── */}
      <motion.section className="about-firm" {...sectionMotion}>
        <div className="about-firm-inner">
          <motion.div className="about-firm-content" {...aosReveal({ direction: "left", distance: 36 })}>
            <motion.h2 className="about-section-label" {...aosReveal({ direction: "left", distance: 28 })}>
              THE FIRM
            </motion.h2>
            <motion.div className="about-firm-body" {...aosReveal({ direction: "right", distance: 30, delay: 0.06 })}>
              <p>
                Mimz Interiors was founded in 2018 with a vision to provide comprehensive turnkey solutions in the design, fabrication, and installation of premium interior furnishings and furniture. We are dedicated to enhancing the interiors of both homes and offices, creating spaces that inspire and reflect the aspirations of our clients.
              </p>
              <p>
                At Mimz Interiors, we specialize in delivering exceptional, contemporary, and customized interior fit-out solutions across various sectors, including corporate offices, restaurants, retail outlets, clinics, luxury villas, and modern homes. With a rapidly expanding national distribution network, we offer a diverse range of inspiring designs, high-quality furnishings, innovative textures, and refreshing colors sourced from around the world—all at competitive prices.
                As one of the few local sources offering a complete 'Design & Build' service, we ensure the seamless implementation of projects, meeting deadlines, maintaining quality, and ensuring customer satisfaction. Our commitment to excellence means we consistently provide interior solutions that adhere to international standards while staying ahead of the latest trends in design and furnishings.
              </p>
              <p>
               In December 2023, we launched Mimz Homes, a sister company to Mimz Interiors, born from the growing demand from our clients who wanted to purchase the furniture, lighting, and accessories used in our designs. With Mimz Homes, we provide a convenient way for clients to access these exclusive items without engaging us for full design services.
              </p>
              <p>
                Our mission is to deliver inspired designs and décor that meet and exceed our clients’ expectations through collaborative efforts and exceptional service. We pride ourselves on tailoring each project to suit our clients' unique personal styles and practical needs. Much of our business is built on repeat clients and referrals—when people choose us once, they return, and they’re happy to recommend us to others.
              </p>
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
              AWARDS
            </motion.h2>
            <motion.div className="about-awards-body" {...aosReveal({ direction: "left", distance: 30, delay: 0.06 })}>
              <p >
                In the past Year Mimz Interior has grown to be a worthy award winning interior design brand. 
                Leadership Award? And how these awards impact your work and motivation?
              </p>
              <p >
                Receiving awards like the recent African property awards,  Luxury Lifestyle Award, Future Awards, and the Nelson Mandela Leadership Award has been incredibly motivating. These awards and remarkable reviews serves as a reminder that our hard work is being recognized also It affirms that we are on the right path and doing something impactful.
                These accolades not only boost our confidence but also push us to do even better. It shows that people, including international bodies, are watching our progress. 
              </p>
              <p>
              It’s a great motivation for us to continue striving for excellence. Every award is a reflection of the collective effort of the entire team, reminding us that our work is making a difference.
              </p>
            </motion.div>
            <motion.blockquote className="about-awards-quote" {...aosReveal({ direction: "up", distance: 24, delay: 0.08 })}>
              "When it comes to interiors, uniqueness is the ultimate luxury."
            </motion.blockquote>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
