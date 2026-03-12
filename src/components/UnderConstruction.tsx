import { Rocket } from "lucide-react";
import Link from "next/link";

export default function UnderConstruction() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="animate-fade-in-up delay-100">
        <Rocket className="w-16 h-16 text-primary mx-auto mb-6 animate-bounce" />
      </div>
      <h1 className="animate-fade-in-up delay-200 text-4xl md:text-5xl font-condensed font-bold text-gradient mb-4">
        Pagina in costruzione
      </h1>
      <p className="animate-fade-in-up delay-300 text-lg md:text-xl text-foreground-dim max-w-md mb-8">
        Stiamo lavorando a questa sezione. Torna presto per scoprire le novità!
      </p>
      <div className="animate-fade-in-up delay-400 flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg rocket-gradient text-white font-condensed font-bold text-lg hover:scale-105 transition-transform duration-200"
        >
          Torna alla Home
        </Link>
        <a
          href="https://www.instagram.com/redpropulsion/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg border border-primary text-primary font-condensed font-bold text-lg hover:bg-primary/10 transition-colors duration-200"
        >
          Seguici su Instagram
        </a>
      </div>
    </div>
  );
}
