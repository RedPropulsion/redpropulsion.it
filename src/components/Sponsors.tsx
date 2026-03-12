import Content from "@/content/sponsors.json";
import Image from "next/image";

interface Sponsor {
  name: string;
  image: string;
  url: string;
  description: string;
  scale?: string;
}

export default function Sponsors() {
  const sponsors = Content.sponsors as Sponsor[];

  return sponsors.length > 0 ? (
    <div className="w-full relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {sponsors.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-start p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(211,47,47,0.15)] h-full"
          >
            {/* Logo area */}
            <div className="h-24 w-full flex items-center justify-center mb-6 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                className="max-h-16 w-auto opacity-60 group-hover:opacity-100 transition-all duration-500 drop-shadow-md"
                width={200}
                height={80}
                style={{ 
                  objectFit: "contain",
                  transform: `scale(${item.scale || 1})`
                }}
              />
            </div>

            {/* Testo */}
            <div className="text-center">
              <h3 className="font-condensed text-xl font-bold text-white group-hover:text-primary transition-colors duration-500 mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-foreground-dim font-condensed leading-relaxed">
                {item.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
}
