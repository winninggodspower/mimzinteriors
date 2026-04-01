"use client";

import Image from "next/image";
import { useEffect } from "react";
import mapImage from "@assets/images/contact/map.png";
import patterns from "@assets/images/patterns.png";

const ContactInfo = [
  {
    icon: "📍",
    label: "ADDRESS",
    content: (
      <>
        <p>Block 52, plot 27A Bisola Durosinmi Etti Dr, Lekki</p>
        <p>Phase 1, Lekki 105102, Lagos</p>
      </>
    ),
  },
  {
    icon: "📞",
    label: "GET IN TOUCH",
    content: (
      <>
        <p>
          <a href="tel:+2347081333763">Phone: 0708-133 7763</a>
        </p>
      </>
    ),
  },
  {
    icon: "🕐",
    label: "Visiting Days",
    content: (
      <>
        <p>Mon-Fri : 8 AM - 5 PM</p>
        <p>By appointment only</p>
      </>
    ),
  },
  {
    icon: "✉️",
    label: "BOOK AN APPOINTMENT",
    content: (
      <>
        <p>
          Email:{" "}
          <a href="mailto:inquiries@mimzinteriors.com">
            inquiries@mimzinteriors.com
          </a>
        </p>
      </>
    ),
  },
];

export default function Contact() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-in-view");
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = document.querySelectorAll(".contact-animate");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="contact-main">
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="contact-hero contact-animate">
        <div className="contact-hero-inner">
          <h1 className="contact-hero-title">Get In Touch</h1>
          <p className="contact-hero-subtitle">
            Have a project in mind? We'd love to hear from you. Reach out to discuss your design aspirations.
          </p>
        </div>
      </section>

      {/* ── INFO GRID ───────────────────────────────────── */}
      <section className="contact-info-section contact-animate">
        <div className="contact-info-inner">
          <div className="contact-info-grid">
            {ContactInfo.map((item, i) => (
              <div key={i} className="contact-info-card">
                <span className="contact-info-icon">{item.icon}</span>
                <h3 className="contact-info-label">{item.label}</h3>
                <div className="contact-info-content">{item.content}</div>
              </div>
            ))}
          </div>

          <div className="contact-map-wrap">
            <Image
              src={mapImage}
              alt="Mimz Interiors location in Lekki, Lagos"
              fill
              className="contact-map-image"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────── */}
      <div className="contact-divider" />

      {/* ── CTA SECTION ─────────────────────────────────── */}
      <section className="contact-cta contact-animate">
        <div className="contact-cta-pattern" aria-hidden="true">
          <Image src={patterns} alt="" fill className="contact-cta-pattern-img" sizes="100vw" />
        </div>
        <div className="contact-cta-inner">
          <h2>Ready To Transform Your Space?</h2>
          <p>Our team is ready to bring your vision to life with thoughtful design and expert execution.</p>
          <a href="mailto:inquiries@mimzinteriors.com" className="contact-cta-btn">
            Start Your Project
          </a>
        </div>
      </section>
    </main>
  );
}
