"use client";
import Link from "next/link";
export type ButtonProps = {
  title: string;
  url?: string;
  primary?: boolean;
};

function scrollDown() {
  window.scrollBy({
    top: window.innerHeight * 0.9,
    behavior: "smooth",
  });
}

export default function Button({ title, url, primary }: ButtonProps) {
  const isExternal = url?.startsWith("http");

  const commonStyles = {
    clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
  };

  const buttonContent = (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group/btn px-8 py-3 transition-all duration-1000 ease-out">
      {primary ? (
        // Same gradient as "RED PROPULSION" text, slightly shifting on hover
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark group-hover/btn:from-primary/90 group-hover/btn:to-primary-dark/80 transition-all duration-1000 ease-out" />
      ) : (
        <div className="absolute inset-0 bg-white/5 group-hover/btn:bg-white/10 backdrop-blur-md transition-all duration-1000 ease-out border border-white/10 group-hover/btn:border-white/30" />
      )}

      {/* Dynamic Hover Glow - Primary gets dark red, Secondary gets subtle white */}
      {primary ? (
        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-1000 ease-out bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(125,3,15,0.7)_0%,transparent_75%)] pointer-events-none" />
      ) : (
        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-1000 ease-out bg-[radial-gradient(circle_at_var(--x,_50%)_var(--y,_50%),rgba(255,255,255,0.15)_0%,transparent_75%)] pointer-events-none" />
      )}

      {/* Text Label */}
      <span className="relative z-10 text-white font-condensed font-bold text-xl md:text-2xl tracking-widest uppercase transition-colors duration-700 ease-out">
        {title}
      </span>

      {/* Inner Border Glow */}
      <div className="absolute inset-0 border border-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none" style={{ clipPath: "inherit" }} />
    </div>
  );

  const containerClasses = "relative block w-full sm:w-auto h-14 sm:h-16 transition-[transform,background-color,border-color] duration-700 ease-[cubic-bezier(0.2,0,0,1)] will-change-[transform,background-color,border-color] active:scale-[0.98]";

  if (url === "scroll") {
    return (
      <button
        onClick={scrollDown}
        aria-label={`Scroll to ${title}`}
        className={containerClasses}
        style={commonStyles}
      >
        {buttonContent}
      </button>
    );
  }

  if (url) {
    return (
      <Link
        href={url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={containerClasses}
        style={commonStyles}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button aria-label={title} className={containerClasses} style={commonStyles}>
      {buttonContent}
    </button>
  );
}
