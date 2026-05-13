"use client";

import { Marquee } from "@/components/ui/marquee";
import TestimonialCard from "@features/home/components/testimonial-card";

export default function TestimonialsSection({ testimonials }) {
  return (
    <section className="bg-white pb-36 md:pt-10">
      <div className="mx-auto w-full">
        <h2 className="font-caterina text-center text-[1.9rem] leading-none uppercase text-[#161616] sm:text-[2.2rem] px-2">
            Client Reviews
          </h2>

        <div className="mt-4 bg-mimz-gold py-13">
          <Marquee
            pauseOnHover
            repeat={3}
            className="w-full [--duration:30s] [--gap:1.5rem] sm:[--gap:2rem]"
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={`${testimonial.name}-${testimonial.role}`}
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
