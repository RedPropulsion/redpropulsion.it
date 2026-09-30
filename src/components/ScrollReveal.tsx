"use client";

import { useEffect, useRef, ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

export default function ScrollReveal({ children, className = "" }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        el.classList.add("reveal-ready");

        const observer = new IntersectionObserver(
            ([entry]) => {
                const viewportHeight = entry.rootBounds?.height ?? window.innerHeight;
                if (entry.isIntersecting && (entry.intersectionRatio >= 0.15 || entry.boundingClientRect.height * 0.15 > viewportHeight)) {
                    el.classList.add("visible");
                    observer.unobserve(el);
                }
            },
            { threshold: [0, 0.15] },
        );

        observer.observe(el);
        return () => { observer.disconnect(); el.classList.remove("reveal-ready"); };
    }, []);

    return (
        <div ref={ref} className={`scroll-reveal ${className}`}>
            {children}
        </div>
    );
}
