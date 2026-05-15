"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import FeaturedProjectCard from "@features/home/components/featured-project-card";

const SECTION_LIMIT = 3;

const revealMotion = {
  initial: { opacity: 0, y: 48, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.08, delay: 0.08, ease: [0.16, 1, 0.3, 1] },
};

const projectCardVariants = {
  hidden: { opacity: 0, y: 32, rotate: -1.2 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.85,
      delay: index * 0.12,
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

function FeaturedProjectCardSkeleton() {
  return (
    <div className="animate-pulse bg-white">
      <div className="h-95.5 bg-slate-200" />
      <div className="flex items-center justify-between gap-4 bg-[#CEAD8B]/20 px-4 py-4 sm:px-5 sm:py-4.5">
        <div className="h-5 w-36 rounded bg-slate-300 sm:h-7" />
        <div className="h-4 w-20 rounded bg-slate-300" />
      </div>
    </div>
  );
}

export default function FeaturedProjectsSection() {
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

        console.error("Failed to load featured projects:", error);
        setStatus("error");
      }
    };

    loadFeaturedProjects();

    return () => {
      abortController.abort();
    };
  }, []);

  const hasProjects = useMemo(() => projects.length > 0, [projects]);

  return (
    <motion.section className="bg-white px-6 sm:px-8 lg:px-10 mb-20 md:mb-40" {...revealMotion}>
      <div className="mx-auto max-w-350">
        <h2 className="font-caterina text-[1.9rem] leading-none text-center uppercase text-[#161616] sm:text-[2.2rem]">
          OUR PROJECTS
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {status === "loading" &&
            Array.from({ length: SECTION_LIMIT }).map((_, index) => (
              <motion.div
                key={`featured-project-skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
              >
                <FeaturedProjectCardSkeleton />
              </motion.div>
            ))}

          {status === "success" &&
            hasProjects &&
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={projectCardVariants}
              >
                <FeaturedProjectCard
                  title={project.title}
                  date={formatProjectDate(project)}
                  image={project.profileImage}
                  href={`/projects/project_catalogue/${project.id}`}
                />
              </motion.div>
            ))}
        </div>

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-aref-ruqaa text-[1rem] text-slate-600"
          >
            Featured projects are not available right now.
          </motion.p>
        )}

        {status === "success" && !hasProjects && (
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

        <Link
          href="/projects/project_catalogue"
          className="mt-8 inline-flex min-w-28 items-center justify-center rounded-[8px] bg-[#cb912d] px-6 py-3 font-aref-ruqaa text-[1rem] leading-none uppercase text-white transition-colors duration-200 hover:bg-[#b88024]"
        >
          View More
        </Link>
      </div>
    </motion.section>
  );
}
