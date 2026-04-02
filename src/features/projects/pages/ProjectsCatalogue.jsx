"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import projectHero from "@assets/images/projects/projectsCatalogue/projectscataloguehero.png";
import projectA from "@assets/images/projects/projectsCatalogue/projecta.png";
import projectB from "@assets/images/projects/projectsCatalogue/projectb.png";
import projectC from "@assets/images/projects/projectsCatalogue/projectc.png";
import seperator from "@assets/images/seperator.png";

const PAGE_SIZE = 12;
const API_URL = "REPLACE_WITH_BACKEND_URL";

const mockPool = [
  {
    profileImage: projectA,
    title: "Project Pearl",
  },
  {
    profileImage: projectB,
    title: "Project Ivory",
  },
  {
    profileImage: projectC,
    title: "Project Aura",
  },
];

const mockProjects = Array.from({ length: 24 }, (_, index) => {
  const source = mockPool[index % mockPool.length];
  return {
    id: `project-${index + 1}`,
    title: `${source.title} ${index + 1}`,
    profileImage: source.profileImage,
  };
});

async function fetchProjects({ page, limit }) {
  const offset = (page - 1) * limit;

  // Replace this block with your backend call when API is ready.
  // Example:
  // const res = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
  // return res.json();
  await new Promise((resolve) => setTimeout(resolve, 320));

  const pageItems = mockProjects.slice(offset, offset + limit);

  return {
    projects: pageItems,
    total: mockProjects.length,
    limit,
    offset,
  };
}

function ProjectsCatalogueContent() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("prjc-in-view");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const targets = document.querySelectorAll(".prjc-animate");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projectsCatalogue", page, PAGE_SIZE],
    queryFn: () => fetchProjects({ page, limit: PAGE_SIZE, apiUrl: API_URL }),
    placeholderData: keepPreviousData,
  });

  const totalPages = useMemo(() => {
    if (!data?.total) {
      return 1;
    }
    return Math.ceil(data.total / PAGE_SIZE);
  }, [data?.total]);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <main className="prjc-main">
      <section className="prjc-hero prjc-animate">
        <div className="prjc-hero-wrap">
          <Image
            src={projectHero}
            alt="Project catalogue hero"
            fill
            priority
            className="prjc-hero-img"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="prjc-intro prjc-animate">
        <p className="prjc-img-credit">-All images belongs to Mimz interiors-</p>
        <h1 className="prjc-title">PROJECT CATALOG</h1>
        <p className="prjc-intro-copy">
          Our project speaks loudly for itself as we handle them with the highest form of professionalism from field workers to our customer care services. All process documentation and alignments are done with modern tools to give a remarkable impression at the beginning and end of every project. At Mimz interior, we give every client a reason to come back.
        </p>
      </section>

      <section className="prjc-gallery-section prjc-animate">
        {isLoading ? (
          <div className="prjc-loading">Loading projects...</div>
        ) : (
          <div className="prjc-gallery-grid">
            {data?.projects?.map((project, index) => (
              <article
                key={project.id}
                className="prjc-card"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <Link
                  href={`/projects/projectCatalogue/${project.id}`}
                  className="prjc-card-image-wrap"
                  aria-label={project.title}
                >
                  <Image
                    src={project.profileImage}
                    alt={project.title}
                    fill
                    className="prjc-card-image"
                    sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <span className="prjc-card-overlay-title">{project.title}</span>
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="prjc-pagination-wrap">
          <button
            type="button"
            className="prjc-page-btn"
            disabled={!canGoPrev || isFetching}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            &lt; Previous
          </button>

          <button
            type="button"
            className="prjc-page-btn"
            disabled={!canGoNext || isFetching}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next &gt;
          </button>
        </div>
      </section>

      <section className="prjc-quote prjc-animate">
        <div className="prjc-quote-inner">
          <blockquote>
            We design and create spaces from residential homes to office spaces with a focus on functionality and aesthetic appeal. We are never out of style.
          </blockquote>
          <div className="prjc-separator-wrap" aria-hidden="true">
            <Image
              src={seperator}
              alt=""
              fill
              className="prjc-separator-img"
              sizes="(min-width: 1024px) 190px, 40vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProjectsCatalogue() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProjectsCatalogueContent />
    </QueryClientProvider>
  );
}