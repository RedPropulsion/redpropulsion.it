import Image from "next/image";

export type BentoSectionProps = {
    title: string;
    text: string;
    images: string[];
};

export default function BentoSection({ title, text, images }: BentoSectionProps) {
    return (
        <div className="px-4 py-24 sm:py-32 relative max-w-7xl mx-auto">
            {/* LAYOUT A BLOCCHI ALTERNATI (ZIG-ZAG) PER BILANCIARE GLI SPAZI */}
            <div className="flex flex-col gap-16 md:gap-24">

                {/* Blocco Superiore: Testo a sinistra, Foto 1 a destra */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col justify-center order-1 lg:order-1">
                        {title && (
                            <div className="mb-6">
                                <h2 className="section-title text-left mb-0">
                                    {title}
                                </h2>
                            </div>
                        )}
                        <div className="prose prose-invert max-w-none font-condensed text-white/80 leading-relaxed text-base sm:text-xl whitespace-pre-wrap pl-6 border-l-2 border-white/10 relative">
                            {/* Dynamic Gradient Anchor Line */}
                            <div className="absolute left-[-2px] top-0 w-[2px] h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                            {text}
                        </div>
                    </div>

                    {images[0] && (
                        <div className="relative w-full h-[220px] sm:h-[400px] lg:h-[500px] rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 group order-2 lg:order-2 transition-all duration-700">
                            {/* Premium Zoom Image */}
                            <Image
                                src={images[0]}
                                alt={`${title} Immagine 1`}
                                fill
                                className="object-cover transition-all duration-[3000ms] ease-out group-hover:scale-105 group-hover:brightness-[1.15]"
                            />

                            {/* HUD Overlay Layer */}
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                {/* Corner Brackets - Optimized with transform for maximum smoothness */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/60 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] delay-75 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/60 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] delay-150 -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/60 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] delay-[225ms] translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/60 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] delay-300 -translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />

                                {/* Telemetry Data - Centered & Faded */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500">
                                    <span className="font-mono text-[7px] text-primary/70 tracking-[0.5em] uppercase">Target_Acquired // 0.982s</span>
                                </div>
                                <div className="absolute top-8 right-8 text-right font-mono text-[7px] text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                    LAT: 43.7992° N<br />LON: 11.2501° E
                                </div>

                                {/* Vignette Focus */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.5)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Blocco Inferiore: Foto 2 Panoramica a tutta larghezza */}
                {images[1] && (
                    <div className="relative w-full h-[220px] sm:h-[400px] lg:h-[600px] rounded-xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group transition-all duration-700">
                        {/* Premium Zoom Image */}
                        <Image
                            src={images[1]}
                            alt={`${title} Immagine 2`}
                            fill
                            className="object-position-top object-cover transition-all duration-[3000ms] ease-out group-hover:scale-105 group-hover:brightness-[1.15]"
                        />

                        {/* HUD Overlay Layer */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            {/* Corner Brackets - Refined with transform */}
                            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-primary/60 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] delay-75 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-primary/60 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] delay-150 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-primary/60 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] delay-[225ms] translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-primary/60 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] delay-300 -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />

                            {/* Telemetry Data */}
                            <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-2 font-mono text-[7px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500">
                                <span>PRS: 101.3 KPA</span>
                                <span>VEL: 0.00 M/S</span>
                                <span className="text-primary/50">STA: LOCKED</span>
                            </div>

                            {/* Vignette Focus */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.6)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
