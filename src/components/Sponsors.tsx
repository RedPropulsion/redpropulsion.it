import Content from "@/content/sponsors.json";
import Image from "./ResponsiveImage";

interface Sponsor {
  name: string;
  image: string;
  url?: string;
  logoBackground?: "light";
  logoFit?: "contain" | "cover";
  logoWidth?: number;
  logoHeight?: number;
  description: string;
  scale?: string;
}

export default function Sponsors() {
  const sponsors = Content.sponsors as Sponsor[];

  return sponsors.length > 0 ? (
    <div className="w-full relative">
      <div className="grid grid-cols-6 gap-6 max-w-7xl mx-auto">
        {sponsors.map((item) => {
          const Card = item.url ? "a" : "div";
          return (
          <Card
            key={item.name}
            href={item.url}
            target={item.url ? "_blank" : undefined}
            rel={item.url ? "noopener noreferrer" : undefined}
            className="col-span-6 sm:col-span-3 lg:col-span-2 sm:last:col-start-1 sm:last:translate-x-[calc(50%+12px)] lg:last:col-start-auto lg:last:translate-x-0 group flex flex-col items-center justify-start p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-primary/40 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(211,47,47,0.15)] h-full"
          >
            {/* Logo area */}
            <div className={`relative h-24 w-full shrink-0 flex items-center justify-center mb-6 overflow-hidden ${item.logoBackground === "light" ? "bg-white rounded-lg px-3" : ""}`}>
              <div
                className="relative max-w-[calc(100%-40px)]"
                style={{ width: item.logoWidth ?? 240, height: item.logoHeight ?? 64 }}
              >
              <Image
                src={item.image}
                alt={item.name}
                className="object-contain"
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 75vw"
                style={{ 
                  objectFit: item.logoFit || "contain",
                  transform: `translateY(${item.name === "Design Wrap" ? 7 : 0}px) scale(${item.scale || 1})`
                }}
              />
              </div>
            </div>

            {/* Testo */}
            <div className="text-center">
              <h3 className="font-condensed text-xl font-bold text-white group-hover:text-primary transition-colors duration-500 mb-2">
                {item.name}
              </h3>
              {item.description && <p className="text-sm text-foreground-dim font-condensed leading-relaxed">
                {item.description}
              </p>}
            </div>
          </Card>
          );
        })}
      </div>
    </div>
  ) : (
    ""
  );
}
