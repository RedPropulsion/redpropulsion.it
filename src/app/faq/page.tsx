import Content from "@/content/faq.json";
import { FaqList } from "@/components/FaqList";

export function generateMetadata() {
  return {
    title: "FAQ",
    description: "Domande frequenti sul team Red Propulsion",
  };
}

export default function Page() {
  return (
    <main className="min-h-screen pb-32 md:pb-40 relative z-10">
      {/* Page Header */}
      <section className="w-full relative h-[40vh] min-h-[320px] flex items-center justify-center">
        <div className="relative z-10 text-center px-4 mt-20 animate-fade-in-up delay-100">
          <h1 className="text-6xl md:text-8xl font-condensed font-bold uppercase text-gradient mb-4">
            FAQ
          </h1>
          <p className="font-condensed text-foreground-dim text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            Domande frequenti sul team e sulle nostre attività.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 mt-2 md:mt-6">
        {/* FAQ List with staggered entry */}
        <FaqList items={Content.faq} />
      </div>
    </main>
  );
}
