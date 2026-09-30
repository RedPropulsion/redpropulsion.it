import Sponsors from '@/components/Sponsors';
import Content from '@/content/sponsors_page.json';
import Block from '@/components/Block';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: Content.title,
  description: Content.description,
  alternates: { canonical: "/partners" },
};

export default function Page() {
  return (
    <main className="min-h-screen pb-32 md:pb-40 relative z-10 bg-background-dark">
      {/* Page Header */}
      <section className="w-full relative h-[40vh] min-h-[320px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/50 to-background-dark" />
        <div className="relative z-10 text-center px-4 mt-16 md:mt-24 animate-fade-in-up delay-100">
          <h1 className="text-6xl md:text-8xl font-condensed font-bold uppercase text-gradient mb-4">
            {Content.title}
          </h1>
          <p className="font-condensed text-foreground-dim text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {Content.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mt-8 md:mt-12 px-6 relative">
        <div className="animate-fade-in-up delay-300 relative z-10">
          <div className="flex items-center gap-4 md:gap-6 max-w-md mx-auto mb-14">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-white/15" />
            <span className="font-condensed text-xs uppercase tracking-[0.35em] text-white/70 whitespace-nowrap">
              I Nostri Sostenitori
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-white/15 to-white/15" />
          </div>
          <div className="relative isolate max-w-7xl mx-auto">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in srgb, var(--primary) 16%, transparent) 0%, color-mix(in srgb, var(--primary) 7%, transparent) 50%, transparent 100%)",
              }}
            />
            <Sponsors />
          </div>
        </div>
      </div>
      {Content.sections.map((section, index) => <Block key={index} content={section} />)}
    </main>
  );
}
