import React, { useId } from "react";
import Image from 'next/image';

interface TeamCardProps {
  firstName: string;
  lastName?: string;
  role: string;
  linkedin?: string;
  imgSrc?: string;
  isHead?: boolean | string;
  compact?: boolean; // Nuova prop per il layout ad alta densità
  premium?: boolean; // Nuova prop per evidenziare il Team Leader
}

export default function TeamCard({ firstName, lastName, role, linkedin, imgSrc, isHead, compact, premium }: TeamCardProps) {
  const noiseId = useId();

  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
  const isLead = Boolean(isHead);
  const badgeText = typeof isHead === 'string' ? isHead : 'Team Lead';

  // Controlla se l'immagine è il placeholder per adattare il padding/object-fit
  const isPlaceholder = imgSrc?.includes('placeholder');

  // --- LAYOUT LISTA ULTRA-COMPATTA (Per i membri regolari) ---
  if (compact) {
    return (
      <div className="group relative flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_5px_20px_rgba(211,47,47,0.15)] hover:-translate-y-1 w-full">
        {/* Avatar Piccolo */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full overflow-hidden border border-white/10 bg-black/40 shadow-inner group-hover:border-primary/50 transition-colors duration-500">
          {/* Backlight Glow - Subtle ellipse */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(211,47,47,0.03)_40%,transparent_70%)] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none" />
          
          <Image
            src={String(imgSrc)}
            alt={`${fullName} photo`}
            fill
            className={`transition-all duration-[1.5s] ${isPlaceholder ? 'object-cover p-0 opacity-90' : 'object-cover'}`}
            style={!isPlaceholder ? { 
              filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.2)) drop-shadow(0 0 12px rgba(255,255,255,0.1))' 
            } : {}}
          />
        </div>

        {/* Testo Compatto */}
        <div className="flex-grow flex flex-col justify-center min-w-0 pr-8">
          <h3 className="font-condensed text-lg md:text-xl font-bold text-white mb-0.5 group-hover:text-primary transition-colors duration-500 leading-tight truncate">
            {fullName}
          </h3>
          <p className="font-condensed text-foreground-dim text-xs md:text-sm tracking-wide uppercase truncate">
            {role}
          </p>
        </div>

        {/* LinkedIn Button Compatto - Absolute Positioned */}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/5 border border-white/10 text-foreground-dim hover:text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_15px_rgba(211,47,47,0.6)] transition-all duration-500 z-10"
            aria-label={`Profilo LinkedIn di ${fullName}`}
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        )}
      </div>
    );
  }

  // --- LAYOUT HERO GIGANTE (Per i Team Lead / Head) ---
  return (
    <div className={`group relative overflow-hidden rounded-xl md:rounded-[2rem] border transition-all duration-500 hover:-translate-y-1 flex flex-col h-full ${premium
      ? 'border-white/15 bg-[#0d0d0d] hover:border-white/40 hover:shadow-[0_10px_40px_rgba(255,255,255,0.08)] col-span-1 shadow-2xl shadow-white/5'
      : isLead
        ? 'border-white/10 bg-[#0a0a0a] hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(211,47,47,0.2)] col-span-1 shadow-xl shadow-black/50'
        : 'border-white/10 bg-[#0a0a0a]'
      }`}>

      {/* Container Immagine */}
      <div className={`relative w-full overflow-hidden bg-[#0a0a0a] aspect-[3/4] sm:aspect-square`}>
        {/* Backlight Glow for Leads - Elliptical with theme hint */}
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.12)_0%,rgba(211,47,47,0.05)_40%,transparent_70%)] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 pointer-events-none z-0" />
        
        <Image
          src={String(imgSrc)}
          alt={`${fullName} photo`}
          fill
          className={`transition-all duration-[1.5s] ${isPlaceholder ? 'object-cover p-0 opacity-90' : 'object-cover object-center sm:object-[center_top]'}`}
          style={!isPlaceholder ? { 
            filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.3)) drop-shadow(0 0 20px rgba(255,255,255,0.08)) drop-shadow(0 0 40px rgba(211,47,47,0.05))' 
          } : {}}
          loading="lazy"
        />

        {/*
          Soluzione Definitiva Anti-Banding: Dithering + Multi-stop Gradient
          L'aggiunta di un microscopico rumore granulare (noise) spacca le linee di rendering
          dei monitor forzando i pixel a sfumarsi caoticamente (dithering).
        */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none z-10">
          <svg className="absolute w-0 h-0">
            <filter id={noiseId}>
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
            </filter>
          </svg>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to top,
                #0a0a0a 0%,
                rgba(10, 10, 10, 0.98) 15%,
                rgba(10, 10, 10, 0.85) 30%,
                rgba(10, 10, 10, 0.6) 55%,
                rgba(10, 10, 10, 0.3) 75%,
                rgba(10, 10, 10, 0) 100%
              )`
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{ filter: `url(#${noiseId})` }}
          />
        </div>
      </div>

      {/* Contenuto Testuale e Glassmorphism Header */}
      <div className={`p-3 md:p-8 flex flex-col justify-start flex-grow relative z-20 -mt-2 ${premium ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'}`}>

        {/* Badge Eyebrow per i Responsabili */}
        {isLead && (
          <span className={`${premium ? 'text-white/80 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] scale-105 origin-left' : 'text-primary'} font-orbitron font-bold tracking-[0.2em] text-[10px] md:text-sm uppercase mb-1 md:mb-3 block transition-all duration-500`}>
            {badgeText}
          </span>
        )}

        <h3 className={`font-condensed text-sm md:text-3xl font-bold text-white mb-0.5 md:mb-1 transition-all duration-500 leading-tight ${premium ? 'group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'group-hover:text-primary'}`}>
          {fullName}
        </h3>

        <p className="font-condensed text-foreground-dim text-[10px] md:text-base tracking-wide uppercase">
          {role}
        </p>

        {/* Pulsante LinkedIn — absolute posizionato, responsive */}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute bottom-2 right-2 md:bottom-6 md:right-6 p-1 md:p-2 rounded-full bg-white/5 border border-white/10 text-foreground-dim hover:text-white transition-all duration-500 ${premium
              ? 'hover:bg-white/20 hover:border-white hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]'
              : 'hover:bg-primary hover:border-primary hover:shadow-[0_0_15px_rgba(211,47,47,0.6)]'
              }`}
            aria-label={`Profilo LinkedIn di ${fullName}`}
          >
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
