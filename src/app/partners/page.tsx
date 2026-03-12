import Sponsors from '@/components/Sponsors';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Partners",
  description: "Scopri le aziende che supportano il progetto Red Propulsion.",
};

export default function Page() {
  return (
    <main className="min-h-screen pb-32 md:pb-40 relative z-10 bg-background-dark">
      {/* Page Header */}
      <section className="w-full relative h-[40vh] min-h-[320px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/50 to-background-dark" />
        <div className="relative z-10 text-center px-4 mt-16 md:mt-24 animate-fade-in-up delay-100">
          <h1 className="text-6xl md:text-8xl font-condensed font-bold uppercase text-gradient mb-4">
            Partners
          </h1>
          <p className="font-condensed text-foreground-dim text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Le aziende e le istituzioni che supportano il nostro team studentesco fornendo risorse, materiali e supporto tecnico.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mt-8 md:mt-12 px-6 relative">
        {/* Glow Decorativo di Sfondo */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-[550px] bg-primary/20 blur-[180px] rounded-full pointer-events-none opacity-0 animate-[fadeIn_1.2s_ease-out_0.4s_forwards]" />
        
        <div className="animate-fade-in-up delay-300 relative z-10">
          <div className="flex items-center gap-4 md:gap-6 max-w-md mx-auto mb-14">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-white/15" />
            <span className="font-condensed text-xs uppercase tracking-[0.35em] text-white/30 whitespace-nowrap">
              I Nostri Sostenitori
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white/15 to-white/15" />
          </div>
          <Sponsors />
        </div>
      </div>
    </main>
  );
}
