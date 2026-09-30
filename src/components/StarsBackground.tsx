"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Stable seeds keep the same sky during hydration and route changes.
function createStars(count: number, seed: number) {
    let state = seed;
    const random = () => {
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        return state / 4294967296;
    };
    return Array.from({ length: count }, () => ({
        left: `${2 + random() * 96}%`,
        top: `${random() * 100}%`,
        delay: `${-random() * 12}s`,
        duration: `${6 + random() * 6}s`,
        minimum: 0.12 + random() * 0.08,
        maximum: 0.32 + random() * 0.2,
    }));
}

const layers = [
    { speed: 0.08, size: "w-[1px] h-[1px] md:w-[2px] md:h-[2px]", stars: createStars(30, 123) },
    { speed: 0.2, size: "w-[2px] h-[2px] md:w-[3px] md:h-[3px]", stars: createStars(18, 456) },
    { speed: 0.38, size: "w-[3px] h-[3px] md:w-[4px] md:h-[4px]", stars: createStars(10, 789) },
];

export default function StarsBackground() {
    const rootRef = useRef<HTMLDivElement>(null);
    const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let frame = 0;
        const update = () => {
            frame = 0;
            const height = Math.max(window.innerHeight, 1);
            layers.forEach((layer, index) => {
                const offset = reducedMotion.matches ? 0 : (Math.max(window.scrollY, 0) * layer.speed) % height;
                const element = layerRefs.current[index];
                if (element) element.style.transform = `translate3d(0, -${offset}px, 0)`;
            });
        };
        const schedule = () => {
            if (!frame && !document.hidden) frame = requestAnimationFrame(update);
        };
        const visibility = () => {
            rootRef.current?.setAttribute("data-paused", String(document.hidden));
            if (document.hidden) {
                cancelAnimationFrame(frame);
                frame = 0;
            } else schedule();
        };
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        reducedMotion.addEventListener("change", schedule);
        document.addEventListener("visibilitychange", visibility);
        visibility();
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            reducedMotion.removeEventListener("change", schedule);
            document.removeEventListener("visibilitychange", visibility);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <>
            <div aria-hidden="true" className="fixed inset-0 bg-background-dark -z-10 pointer-events-none" />
            <div ref={rootRef} aria-hidden="true" className="star-field fixed inset-0 overflow-hidden pointer-events-none z-0">
                {layers.map((layer, index) => (
                    <div key={index} ref={element => { layerRefs.current[index] = element; }} className="absolute inset-x-0 top-0 h-[200%]">
                        {/* Identical tiles make each viewport-length wrap seamless. */}
                        {[0, 1].map(tile => (
                            <div key={tile} className="absolute inset-x-0 h-1/2" style={{ top: `${tile * 50}%` }}>
                                {layer.stars.map((star, id) => (
                                    <div key={id} className={`star absolute bg-white rounded-full ${layer.size}`} style={{
                                        left: star.left,
                                        top: star.top,
                                        animationDelay: star.delay,
                                        animationDuration: star.duration,
                                        "--star-min": star.minimum,
                                        "--star-max": star.maximum,
                                    } as CSSProperties} />
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
