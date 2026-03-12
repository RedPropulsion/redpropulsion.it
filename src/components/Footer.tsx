import RichText from "./RichText";
import Image from "next/image";

type Props = {
  title: string;
  body: string;
  social_links: { name: string; url: string; icon: string }[];
};

export default function Footer({ title, body, social_links }: Props) {
  return (
    <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-xl mt-auto relative z-20">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="w-full px-6 md:px-12 lg:px-16 pt-8 pb-6 md:pt-10 md:pb-3">

        {/* VERO LAYOUT STRUTTURATO (Desktop: Grid 2 colonne, Mobile: Stack) */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">

          {/* Colonna Sinistra: Branding e Testo */}
          <div className="flex flex-col items-center md:items-start max-w-lg text-center md:text-left space-y-4">
            <h2 className="font-orbitron font-bold text-2xl md:text-3xl tracking-widest text-foreground-light">
              {title}
            </h2>
            <div className="font-condensed text-foreground-dim/80 text-sm md:text-base leading-relaxed">
              <RichText content={body} />
            </div>
          </div>

          {/* Colonna Destra: Social Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="font-condensed text-xs uppercase tracking-[0.2em] text-white hidden md:block">
              Seguici
            </span>
            <ul className="flex gap-6 items-center">
              {social_links.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    aria-label={`Visit our ${item.name}`}
                  >
                    <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-white/10 bg-white/5 p-2 transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(211,47,47,0.5)]">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        fill
                        className="object-contain p-[8px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Il Copyright Badge è stato rimosso per neutralità legale come richiesto */}

      </div>
    </footer>
  );
}
