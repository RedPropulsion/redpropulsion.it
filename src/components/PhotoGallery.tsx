"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "./ResponsiveImage";
import OriginalImage from "next/image";

export type GalleryPhoto = { src: string; alt: string; position?: string; fit?: "cover" | "contain" };

export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [failedVariants, setFailedVariants] = useState<Set<string>>(() => new Set());
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const next = Math.max(0, Math.min(photos.length - 1, active + direction));
    const slide = element.children[next] as HTMLElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: slide.offsetLeft - element.offsetLeft, behavior: reduced ? "instant" : "smooth" });
  }
  function updatePosition() {
    const element = track.current;
    if (!element) return;
    const slides = Array.from(element.children) as HTMLElement[];
    const closest = slides.reduce((best, slide, index) =>
      Math.abs(slide.offsetLeft - element.offsetLeft - element.scrollLeft) < Math.abs(slides[best].offsetLeft - element.offsetLeft - element.scrollLeft) ? index : best, 0);
    setActive(closest);
  }
  return (
    <div role="region" aria-label="Fotografie delle attività Red Propulsion" className="min-w-0">
      <div ref={track} onScroll={updatePosition} tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        aria-label="Galleria fotografica, usa le frecce per scorrere"
        className="relative flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory rounded-xl after:content-[''] after:shrink-0 after:basis-[12%] sm:after:basis-[30%] lg:after:basis-[54%] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">
        {photos.map((photo, index) => (
          <figure key={photo.src} className="relative m-0 shrink-0 snap-start basis-[88%] sm:basis-[70%] lg:basis-[46%]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-3xl border border-white/10">
              {failedVariants.has(photo.src) ? (
                <OriginalImage src={photo.src} alt={photo.alt} fill unoptimized sizes="(min-width: 1024px) 580px, (min-width: 640px) 70vw, 88vw" className="object-cover" style={{ objectPosition: photo.position ?? "center", objectFit: photo.fit ?? "cover" }} />
              ) : (
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 580px, (min-width: 640px) 70vw, 88vw" className="object-cover" style={{ objectPosition: photo.position ?? "center", objectFit: photo.fit ?? "cover" }} onError={() => setFailedVariants(previous => new Set(previous).add(photo.src))} />
              )}
            </div>
            <span className="sr-only">Fotografia {index + 1} di {photos.length}</span>
          </figure>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="font-condensed text-sm text-white/60" aria-live="polite" aria-atomic="true">{active + 1} / {photos.length}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} disabled={active === 0} aria-label="Fotografia precedente" className="flex h-11 w-11 items-center justify-center border border-white/20 text-white hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-primary"><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => move(1)} disabled={active === photos.length - 1} aria-label="Fotografia successiva" className="flex h-11 w-11 items-center justify-center border border-white/20 text-white hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-primary"><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}
