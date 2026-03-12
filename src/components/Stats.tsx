"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  statistics: { name: string; value: string }[];
};

// Technical micro-labels for each stat card
const techLabels = ["SYS.CREW", "SYS.DEPT", "SYS.CHRONO", "SYS.MISSION"];

export default function Stats({ statistics }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  return (
    <div ref={ref} className="max-w-6xl mx-auto px-6 mt-16 mb-32 md:mb-40 relative">

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 relative z-10">
        {statistics.map((item, i) => (
          <div
            key={i}
            className={`group relative p-4 md:p-8 bg-white/[0.03] backdrop-blur-sm overflow-hidden
              hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(211,47,47,0.1)]
              transition-all duration-700 ease-out
              ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
            style={{
              clipPath:
                "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
            }}
          >
            {/* Custom Border Frame — Integrated with accents */}
            {/* Top Border */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-white/10 group-hover:bg-primary/20 transition-colors duration-500" />
            {/* Bottom Border */}
            <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/10 group-hover:bg-primary/20 transition-colors duration-500" />
            {/* Left Border */}
            <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-white/10 group-hover:bg-primary/20 transition-colors duration-500" />
            {/* Right Border */}
            <div className="absolute right-0 top-4 bottom-4 w-[1px] bg-white/10 group-hover:bg-primary/20 transition-colors duration-500" />

            {/* Square Corner Accent — Top-Right */}
            <div className="absolute top-0 right-0 w-5 h-5">
              <div className="absolute top-0 right-0 w-full h-[1px] bg-white/15 group-hover:bg-primary transition-all duration-500" />
              <div className="absolute top-0 right-0 w-[1px] h-full bg-white/15 group-hover:bg-primary transition-all duration-500" />
              <div className="absolute top-0 right-0 w-1 h-1 bg-primary group-hover:scale-125 transition-transform duration-500" />
            </div>

            {/* Square Corner Accent — Bottom-Left */}
            <div className="absolute bottom-0 left-0 w-5 h-5">
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/15 group-hover:bg-primary transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-[1px] h-full bg-white/15 group-hover:bg-primary transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-primary group-hover:scale-125 transition-transform duration-500" />
            </div>

            {/* Slanted Edge Accents for the Clip-Path corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/10 group-hover:border-primary/40 transition-colors duration-500 rotate-[0deg]" style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-primary/40 transition-colors duration-500" style={{ clipPath: "polygon(100% 100%, 100% 0, 0 100%)" }} />

            {/* Subtle grid pattern inside card */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Technical micro-label with status dot */}
            <div className="flex items-center gap-2 mb-3 md:mb-5">
              <span className="relative flex h-1 w-1">
                <span className="relative inline-flex rounded-full h-1 w-1 bg-primary/60 group-hover:bg-primary transition-colors duration-500" />
              </span>
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] group-hover:text-white/50 transition-colors duration-500">
                {techLabels[i] || `SYS.${i}`}
              </span>
            </div>

            {/* Value + separator + label wrapped so separator matches text width */}
            <div className="inline-flex flex-col items-start relative z-10">
              {/* Main value */}
              <h2 className="font-condensed text-gradient text-3xl md:text-5xl font-bold leading-none">
                {item.value}
              </h2>

              {/* Thin separator — grows to full text width on hover */}
              <div className="w-8 h-[1px] bg-white/10 group-hover:w-full group-hover:bg-primary/40 transition-all duration-500 my-3" />

              {/* Description */}
              <p className="font-condensed capitalize text-sm md:text-base text-foreground-dim/50 group-hover:text-foreground-dim/80 transition-colors duration-500">
                {item.name}
              </p>
            </div>

            {/* Bottom scan line on hover */}
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-primary/60 via-primary/30 to-transparent transition-all duration-700" />

            {/* Hover glow in bottom-right corner */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/0 group-hover:bg-primary/10 blur-[40px] rounded-full transition-all duration-700 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

