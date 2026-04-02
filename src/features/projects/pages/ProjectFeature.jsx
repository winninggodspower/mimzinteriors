"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import projectHero from "@assets/images/projects/projecthero.png";
import projectCatalogue from "@assets/images/projects/projectcatalogue.png";
import apartments from "@assets/images/projects/apartments.png";
import accessories from "@assets/images/projects/accessories.png";
import seperator from "@assets/images/seperator.png";

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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("prj-in-view");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const targets = document.querySelectorAll(".prj-animate");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="prj-main">
      <section className="prj-hero prj-animate">
        <div className="prj-hero-wrap">
          <Image
            src={projectHero}
            alt="Luxury projects by Mimz Interiors"
            fill
            priority
            className="prj-hero-img"
            sizes="100vw"
          />
          <h1 className="prj-hero-title">PROJECTS</h1>
        </div>
      </section>

      <section className="prj-intro prj-animate">
        <p className="prj-img-credit">-All images belongs to Mimz interiors-</p>
        <p className="prj-intro-copy">
          Our project speaks loudly for itself as we handle them with the highest form of professionalism, from field workers to our customer care services. All process documentation and alignments are done with modern tools to give a remarkable impression at the beginning and end of every project. At Mimz interior, we give every client a reason to come back.
        </p>
      </section>

      <section className="prj-grid-section prj-animate">
        <div className="prj-grid">
          {projectItems.map((item, index) => (
            <article className="prj-card" key={item.title} style={{ transitionDelay: `${index * 0.12}s` }}>
              <Link href={item.href} className="prj-card-image-wrap" aria-label={item.title}>
                <Image src={item.image} alt={item.alt} fill className="prj-card-image" sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw" />
              </Link>
              <div className="prj-card-copy">
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prj-quote prj-animate">
        <div className="prj-quote-inner">
          <blockquote>
            We design and create spaces from residential homes to office spaces with a focus on functionality and aesthetic appeal. We are never out of style.
          </blockquote>
          <div className="prj-quote-separator" aria-hidden="true">
            <Image src={seperator} alt="" fill className="prj-quote-separator-img" sizes="(min-width: 1024px) 180px, 42vw" />
          </div>
          <Link href="/contact" className="prj-cta-btn">
            GET IN TOUCH
          </Link>
        </div>
      </section>
    </main>
  );
}
