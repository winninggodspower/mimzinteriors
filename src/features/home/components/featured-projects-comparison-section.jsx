"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const SECTION_LIMIT = 5;

const revealMotion = {
  initial: { opacity: 0, y: 48, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.08, delay: 0.08, ease: [0.16, 1, 0.3, 1] },
};

const projectVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function formatProjectDate(project) {
  const rawDate = project.featuredAt || project.publishedAt || project.createdAt;

  if (!rawDate) {
    return "Recent";
  }

  const parsedDate = new Date(rawDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recent";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function ComparisonProjectCard({ project, imageClassName }) {
  return (
    <Link href={`/projects/project_catalogue/${project.id}`} className="group block">
      <div className="overflow-hidden bg-white">
        <div className={`relative overflow-hidden bg-[#f3efe7] ${imageClassName}`}>
          <Image
            src={project.profileImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        </div>

        <div className="px-1 pt-3 sm:pt-4">
          <h3 className="font-caterina text-[1.1rem] leading-none uppercase text-[#161616] sm:text-[1.35rem] lg:text-[1.45rem]">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

function FeaturedProjectCardSkeleton({ imageClassName }) {
  return (
    <div className="animate-pulse bg-white">
      <div className={`bg-slate-200 ${imageClassName}`} />
      <div className="px-1 pt-3 sm:pt-4">
        <div className="h-5 w-40 rounded bg-slate-300" />
        <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
      </div>
    </div>
  );
}

function buildDisplayProjects(projects) {
  if (!projects.length) {
    return [];
  }

  return Array.from({ length: SECTION_LIMIT }, (_, index) => projects[index % projects.length]);
}

export default function FeaturedProjectsComparisonSection() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const abortController = new AbortController();

    const loadFeaturedProjects = async () => {
      try {
        setStatus("loading");

        const response = await fetch(`/api/projects/featured?limit=${SECTION_LIMIT}`, {
          signal: abortController.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load featured projects");
        }

        const payload = await response.json();
        const loadedProjects = Array.isArray(payload?.projects) ? payload.projects : [];

        setProjects(loadedProjects);
        setStatus("success");
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }

        console.error("Failed to load comparison projects:", error);
        setStatus("error");
      }
    };

    loadFeaturedProjects();

    return () => {
      abortController.abort();
    };
  }, []);

  const displayProjects = useMemo(() => buildDisplayProjects(projects), [projects]);

  return (
    <motion.section className="bg-white px-6 pb-24 pt-4 sm:px-8 lg:px-10 md:pb-40 md:pt-10" {...revealMotion}>
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-caterina text-[1.9rem] leading-none uppercase text-[#161616] sm:text-[2.2rem]">
          OUR PROJECTS
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-6 md:gap-7 lg:gap-8">
          {status === "loading" &&
            Array.from({ length: SECTION_LIMIT }).map((_, index) => {
              const isBottomRow = index >= 3;
              const imageClassName = isBottomRow ? "aspect-[1.55]" : "aspect-[1.12]";

              return (
                <motion.div
                  key={`comparison-project-skeleton-${index}`}
                  className={index < 3 ? "md:col-span-2" : "md:col-span-3"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                >
                  <FeaturedProjectCardSkeleton imageClassName={imageClassName} />
                </motion.div>
              );
            })}

          {status === "success" &&
            displayProjects.map((project, index) => {
              const isBottomRow = index >= 3;
              const spanClassName = isBottomRow ? "md:col-span-3" : "md:col-span-2";
              const imageClassName = isBottomRow ? "aspect-[1.55]" : "aspect-[1.12]";

              return (
                <motion.div
                  key={`${project.id}-${index}`}
                  custom={index}
                  className={spanClassName}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={projectVariants}
                >
                  <ComparisonProjectCard project={project} imageClassName={imageClassName} />
                </motion.div>
              );
            })}
        </div>

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-aref-ruqaa text-[1rem] text-slate-600"
          >
            The comparison layout is not available right now.
          </motion.p>
        )}

        {status === "success" && !displayProjects.length && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-aref-ruqaa text-[1rem] text-slate-600"
          >
            No featured projects yet.
          </motion.p>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/projects/project_catalogue"
            className="inline-flex min-w-28 items-center justify-center rounded-[8px] bg-[#cb912d] px-6 py-3 font-aref-ruqaa text-[1rem] leading-none uppercase text-white transition-colors duration-200 hover:bg-[#b88024]"
          >
            View More
          </Link>
        </div>
      </div>
    </motion.section>
  );
}