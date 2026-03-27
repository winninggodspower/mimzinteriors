"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import servicehero from "@assets/images/service/servicehero.png";
import dprocessa from "@assets/images/service/dprocessa.png";
import dprocessb from "@assets/images/service/dprocessb.png";
import dprocessc from "@assets/images/service/dprocessc.png";
import icona from "@assets/images/service/icona.svg";

export default function ServicesPage() {
  const processRef = useRef(null);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const quoteRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("svc-in-view");
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = document.querySelectorAll(".svc-animate");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    ["Consultation Services", "Interior Decoration Items", "Concept Development", "3D Renderings and Visualizations"],
    ["Consultation Services", "Interior Decoration Items", "Concept Development", "3D Renderings and Visualizations"],
    ["Consultation Services", "Interior Decoration Items", "Concept Development", "3D Renderings and Visualizations"],
    ["Consultation Services", "Interior Decoration Items", "Concept Development", "3D Renderings and Visualizations"],
    ["Consultation Services", "Space Planning and Layout Design", null, null],
  ];

  const processSteps = [
    {
      num: "1",
      icon: icona,
      title: "BOOK APPOINTMENT",
      desc: "When clients book appointment. Our design process begins when a client reaches out.",
    },
    {
      num: "2",
      icon: "🏠",
      title: "SITE INSPECTION",
      desc: "Inspection to visit the space and discuss their vision and preferences. During this meeting, we take the time to understand the client's lifestyle, personality, and specific needs.",
    },
    {
      num: "3",
      icon: "💬",
      title: "QUOTATION",
      desc: "Alongside this, we prepare a detailed quotation. Once the client approves the design and makes a payment.",
    },
    {
      num: "4",
      icon: "🖥️",
      title: "DIGITAL VISUALIZATION",
      desc: "Next, we create a mood board and 3D renderings to give the client a clear visual of what the final space will look like.",
    },
    {
      num: "5",
      icon: "🔧",
      title: "MANUFACTURING / PRODUCTION",
      desc: "We move into bringing in, producing and manufacturing decor items and Materials.",
    },
    {
      num: "6",
      icon: "🏗️",
      title: "IMPLEMENTATION / ON-SITE SUPERVISION",
      desc: "We move into the implementation phase, bringing the vision to life with precision and attention to detail.",
    },
  ];

  return (
    <main className="svc-main">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="svc-hero" ref={heroRef}>
        <div className="svc-hero-img-wrap">
          <Image
            src={servicehero}
            alt="Luxury interior design by Mimz Interiors"
            fill
            priority
            className="svc-hero-img"
          />
          <div className="svc-hero-overlay" />
        </div>
        <p className="svc-hero-caption">All images belongs to Mimz Interiors</p>
      </section>

      {/* ── HEADLINE ─────────────────────────────────────── */}
      <section className="svc-headline svc-animate">
        <div className="svc-headline-inner">
          <h1 className="svc-headline-title">
            Your Space Designed For Now And The Future.
          </h1>
          <p className="svc-headline-sub">
            Our complete package of services ranges from high quality and specialized services both interior and exterior works to maintenance for both commercial and residential properties.
          </p>
        </div>
      </section>

      {/* ── SERVICES WE OFFER ────────────────────────────── */}
      <section className="svc-offer" ref={servicesRef}>
        <div className="svc-offer-inner">
          <h2 className="svc-offer-title svc-animate">SERVICES WE OFFER.</h2>
          <div className="svc-offer-grid svc-animate">
            {services.map((row, ri) => (
              <div key={ri} className="svc-offer-row">
                {row.map((item, ci) =>
                  item ? (
                    <div key={ci} className="svc-offer-item">
                      <span className="svc-offer-bullet">◆</span>
                      {item}
                    </div>
                  ) : (
                    <div key={ci} className="svc-offer-item svc-offer-empty" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE ─────────────────────────────── */}
      <section className="svc-philosophy svc-animate" ref={quoteRef}>
        <div className="svc-philosophy-inner">
          <blockquote className="svc-philosophy-quote">
            Patience in dealing with clients, staff, and artisans is crucial for a smooth workflow and successful outcomes.
          </blockquote>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────── */}
      <section className="svc-gallery svc-animate" ref={galleryRef}>
        <div className="svc-gallery-grid">
          <div className="svc-gallery-item">
            <Image src={dprocessa} alt="Interior design project" fill className="svc-gallery-img" />
            <div className="svc-gallery-overlay" />
          </div>
          <div className="svc-gallery-item">
            <Image src={dprocessb} alt="Interior design project" fill className="svc-gallery-img" />
            <div className="svc-gallery-overlay" />
          </div>
          <div className="svc-gallery-item">
            <Image src={dprocessc} alt="Interior design project" fill className="svc-gallery-img" />
            <div className="svc-gallery-overlay" />
          </div>
        </div>
      </section>

      {/* ── DESIGN PROCESS ───────────────────────────────── */}
      <section className="svc-process" ref={processRef}>
        <div className="svc-process-inner">
          <h2 className="svc-process-title svc-animate">OUR DESIGN PROCESS</h2>
          <div className="svc-process-grid">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="svc-process-card svc-animate"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="svc-process-header">
                  <span className="svc-process-num">{step.num}</span>
                  <span className="svc-process-sep">·</span>
                  <span className="svc-process-icon">{step.icon}</span>
                  <span className="svc-process-step-title">{step.title}</span>
                </div>
                <p className="svc-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}