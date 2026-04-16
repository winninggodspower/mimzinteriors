"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  MOTION_EASE,
  MOTION_STAGGER,
  sectionReveal,
} from "@features/lib/motion";
import { contactInfo } from "@features/contact/data";

const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Block%2052%2C%20plot%2027A%20Bisola%20Durosinmi%20Etti%20Dr%2C%20Lekki%20Phase%201%2C%20Lekki%20105102%2C%20Lagos&z=15&output=embed";

export default function Contact() {

  return (
    <main className="contact-main">
      <section className="contact-info-section">
        <div className="contact-info-inner">
          <div className="contact-info-grid">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                className="contact-info-card"
                initial={{ x: -56, opacity: 0.2 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.95,
                  delay: i === 0 ? 0 : i * MOTION_STAGGER.wide,
                  ease: MOTION_EASE,
                }}
              >
                <span className="inline-flex h-8 w-8 min-w-8 items-center justify-center [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full">
                  <Image src={item.icon} alt="" aria-hidden="true" />
                </span>
                <div className="flex flex-col justify-center gap-[0.2rem]">
                  <h3 className="m-0 font-caterina text-[40px] leading-[1.2] font-light tracking-[0.04em] uppercase text-black max-md:text-[clamp(1rem,1.8vw,1.4rem)] max-sm:text-[1rem]">
                    {item.label}
                  </h3>
                  <div className="contact-info-content">
                    {item.lines.map((line, lineIndex) => (
                      <p key={lineIndex}>
                        {line.href ? (
                          <>
                            {line.prefix ?? ""}
                            <a href={line.href}>{line.text}</a>
                          </>
                        ) : (
                          line.text
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="contact-map-wrap">
            <iframe
              title="Mimz Interiors location in Lekki, Lagos"
              src={googleMapsEmbedUrl}
              className="contact-map-frame"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
