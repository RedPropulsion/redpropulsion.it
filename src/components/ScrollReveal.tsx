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
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("visible");
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`scroll-reveal ${className}`}>
            {children}
        </div>
    );
}
