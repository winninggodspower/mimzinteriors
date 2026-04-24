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
                className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-1"
                initial={{ x: -56, opacity: 0.2 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.95,
                  delay: i === 0 ? 0 : i * MOTION_STAGGER.wide,
                  ease: MOTION_EASE,
                }}
              >
                <span className="row-start-2 inline-flex h-8 w-8 min-w-8 self-start pt-1">
                  <Image className="w-full h-full object-contain" src={item.icon} alt="" aria-hidden="true" />
                </span>
                <h3 className="col-start-2 mb-1 flex items-start font-caterina text-3xl font-bold tracking-[0.04em] uppercase">
                  {item.label}
                </h3>
                <div className="col-start-2">
                  <p className="text-[20px]">
                    {item.lines.map((line, lineIndex) => (
                      <span key={lineIndex} className="block">
                        {line.href ? (
                          <>
                            {line.prefix ?? ""}
                            <a
                              href={line.href}
                              className="text-black underline transition-opacity duration-240 hover:opacity-80 hover:no-underline"
                            >
                              {line.text}
                            </a>
                          </>
                        ) : (
                          line.text
                        )}
                      </span>
                    ))}
                  </p>
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
