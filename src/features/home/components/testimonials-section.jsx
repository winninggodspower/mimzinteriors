"use client";

import { Marquee } from "@/components/ui/marquee";
import TestimonialCard from "@features/home/components/testimonial-card";
import { googleReviewsUrl } from "@features/home/data";

export default function TestimonialsSection({ testimonials }) {
  return (
    <section className="bg-white pb-36 mt-36 md:mt-48">
      <div className="mx-auto w-full">
        <h2 className="font-caterina text-center text-[1.9rem] leading-none uppercase text-[#161616] sm:text-[2.2rem] px-2">
          Client Reviews
        </h2>
        <div className="mt-2 flex justify-center px-4">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="font-caterina text-sm underline decoration-[#D4B391] decoration-2 underline-offset-4 transition-colors hover:text-[#A77E58]"
          >
            Drop us a review
          </a>
        </div>

        <div className="mt-7 md:mt-10 bg-[#CEAD8B]/30 max-md:h-100 h-112.5 flex items-center justify-start overflow-hidden">
          <Marquee
            pauseOnHover
            repeat={3}
            className="w-full [--duration:50s] [--gap:1.5rem] sm:[--gap:2rem]"
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={`${testimonial.name}-${testimonial.role}`}
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
                rating={testimonial.rating}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
