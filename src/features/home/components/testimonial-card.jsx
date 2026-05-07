"use client";

export default function TestimonialCard({ name, role, quote }) {
  return (
    <article className="flex max-h-[90px] max-w-[385px] py-4 shrink-0 gap-3 rounded-[30px_30px_0px_30px] bg-white px-5 py-3 text-[#2a2621] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="min-w-0 shrink-0 pt-1 font-caterina flex flex-col items-start justify-center">
        <h3 className="text-[16px] leading-[16px] font-light tracking-[0.04em] text-[#C28831] [-webkit-text-stroke:0.3px_#C28831]">
          {name}
        </h3>
        <p className="text-[15px] leading-[15px] font-light tracking-[0.04em] uppercase text-[#C28831]">
          {role}
        </p>
      </div>
      <p className="font-caterina text-[0.72rem] sm:text-[13px]">
        {quote}
      </p>
    </article>
  );
}
