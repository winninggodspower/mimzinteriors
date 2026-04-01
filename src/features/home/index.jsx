"use client";

import Image from "next/image";
import { useEffect } from "react";
import homeHero from "@assets/images/home/homehero.png";
import quoteImage from "@assets/images/home/quoteimage.png";
import patterns from "@assets/images/patterns.png";

export default function HomeFeature() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("home-in-view");
          }
        });
      },
      { threshold: 0.14 }
    );

    const targets = document.querySelectorAll(".home-animate");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-main">
      <section className="home-hero home-animate">
        <div className="home-hero-wrap">
          <Image
            src={homeHero}
            alt="Mimz Interiors project hero"
            fill
            priority
            className="home-hero-img"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="home-intro home-animate">
        <p className="home-img-credit">-All Images belongs to Mimz interiors-</p>
        <div className="home-intro-copy">
          <p>
            Mimz Interior is a company specialized in architectural interior and exterior projects from start to finish, we handle both local and international project that require our design, management skills and furniture fixings for both real estate developers and personal property owners.
          </p>
          <p>
            Mimz interior was founded in the year 2018 by Miracle Godsent Nwachukwu (Creative director). Amongst other wonderful achievement as a model, actor and fashion enthusiast, Miracle has been awarded over the years for his innovative Creation when it comes to interior design and space management. All his efforts has made mimz interior to be awarded best interior design company in the year 2021. Over the years he has made remarkable trailblazing top notch designs ideas that are universally accepted for both homes, office spaces, restaurant etc.
          </p>
          <p>
            At mimz interior, we see through the mind of our clients, by paying attention to details, providing comfort, poise and class putting cost optimization as a great excellent value: enjoying comfort with less cost.
          </p>
        </div>
      </section>

      <section className="home-pattern home-animate" aria-hidden="true">
        <Image src={patterns} alt="" fill className="home-pattern-img" sizes="100vw" />
      </section>

      <section className="home-feature-image home-animate">
        <div className="home-feature-image-wrap">
          <Image
            src={quoteImage}
            alt="Founder standing in a designed interior"
            fill
            className="home-feature-image-img"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="home-quote home-animate">
        <div className="home-quote-inner">
          <blockquote className="home-quote-text">
            "Interior design is my canvas, where every detail is styled to reflect my client's dreams and personality."
          </blockquote>
          <p className="home-quote-author">-Miracle Godsent Nwachukwu-</p>
        </div>
      </section>
    </main>
  );
}
