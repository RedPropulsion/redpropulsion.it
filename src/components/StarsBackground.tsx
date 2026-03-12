"use client";

import { useEffect, useState } from "react";

type Star = {
    left: string;
    top: string;
    delay: string;
    duration: string;
};

export default function StarsBackground() {
    const [layer1, setLayer1] = useState<Star[]>([]);
    const [layer2, setLayer2] = useState<Star[]>([]);
    const [layer3, setLayer3] = useState<Star[]>([]);
    const [scrollY, setScrollY] = useState(0);

    // Gestione Parallasse
    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setScrollY(window.scrollY);
            });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Generazione Stelle divisa in 3 livelli di profondità
    useEffect(() => {
        const generateStars = (count: number, heightPercentage: number) =>
            [...Array(count)].map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * heightPercentage}%`,
                delay: `${Math.random() * 3}s`,
                duration: `${2 + Math.random() * 2}s`,
            }));

        // Livello 1: lontanissime (piccole, lente a scorrere)
        setLayer1(generateStars(40, 150));
        // Livello 2: medie (scorrimento intermedio)
        setLayer2(generateStars(30, 200));
        // Livello 3: vicinissime (più grandi, scorrono molto)
        setLayer3(generateStars(20, 250));
    }, []);

    const renderLayer = (stars: Star[], speed: number, sizeClass: string) => (
        <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{ transform: `translateY(-${scrollY * speed}px)` }}
        >
            {stars.map((star, i) => (
                <div
                    key={i}
                    className={`absolute bg-white rounded-full opacity-15 animate-twinkle ${sizeClass}`}
                    style={{
                        left: star.left,
                        top: star.top,
                        animationDelay: star.delay,
                        animationDuration: star.duration,
                    }}
                />
            ))}
        </div>
    );

    return (
        <>
            {/* Sfondo scuro per evitare bug visuali oltre il limite di scorrimento */}
            <div className="fixed inset-0 bg-background-dark -z-10 pointer-events-none" />
            {/* Lontane: si muovono al 10% della velocità dello scorrimento */}
            {renderLayer(layer1, 0.1, "w-[1px] h-[1px] md:w-[2px] md:h-[2px]")}
            {/* Medie: si muovono al 30% della velocità */}
            {renderLayer(layer2, 0.3, "w-[2px] h-[2px] md:w-[3px] md:h-[3px]")}
            {/* Vicine: si muovono al 60% della velocità */}
            {renderLayer(layer3, 0.6, "w-[3px] h-[3px] md:w-[4px] md:h-[4px]")}
        </>
    );
}
