"use client";

import Content from "@/content/navbar.json";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isHome = usePathname() === "/";
  const router = useRouter();

  // Smooth mobile nav: close menu first, navigate after fade-out
  const handleMobileNav = useCallback((e: React.MouseEvent, url: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      router.push(url);
    }, 300);
  }, [router]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dual threshold logic
  // showPreAnimation: l'animazione rossa parte istantaneamente al primo scroll
  // showGlass: l'effetto vetro completo e il bordo appaiono poco dopo
  const showPreAnimation = !isHome || scrollY > 0;
  const showGlass = !isHome || scrollY > 25;

  const navLinks = Content.links.filter((link) => link.title !== "Join Us");
  const ctaLink = Content.links.find((link) => link.title === "Join Us");

  // Impedisce lo scrolling quando il menu mobile è aperto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);


  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 px-4 pt-6 pointer-events-none">
        <div
          className={`mx-auto max-w-[1400px] flex items-center justify-between px-5 md:px-10 py-0 h-14 md:h-16 pointer-events-auto relative overflow-hidden group/nav border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-in-out will-change-[backdrop-filter,background-color,border-color]
            ${showGlass
              ? "bg-[#080808]/40 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
              : "bg-transparent border-transparent shadow-none"
            }`}
        >
          {/* Telemetry Scanning Line - Full Width (Sincronizzata con showPreAnimation per apparire prima) */}
          <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-white/5 overflow-hidden transition-opacity duration-700 ${showPreAnimation ? "opacity-100" : "opacity-0"}`}>
            {/* Resetting animation on showPreAnimation change by using it as a key */}
            <div
              key={showPreAnimation ? "scanning" : "hidden"}
              className="absolute top-0 left-0 w-[500px] h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan"
            />
          </div>

          {/* Logo - Left */}
          <div className="flex-shrink-0 z-50">
            <Link
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setMenuOpen(false);
              }}
              className="block"
            >
              <h1 className="text-white font-condensed font-bold text-2xl tracking-[0.25em] uppercase hover:text-primary transition-all duration-300">
                {Content.title}
              </h1>
            </Link>
          </div>

          {/* Nav Links - Center (Desktop) */}
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2 h-full">
            {navLinks.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="text-white/60 hover:text-white font-condensed text-sm uppercase tracking-[0.4em] transition-all duration-500 relative h-full flex items-center group/link px-6"
              >
                <div className="relative flex items-center justify-center">
                  {/* Targeting Brackets - Locked to text bounds */}
                  <span className="absolute -left-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 -translate-x-2 group-hover/link:translate-x-0 text-primary/80">[</span>
                  <span className="relative">{item.title}</span>
                  <span className="absolute -right-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 translate-x-2 group-hover/link:translate-x-0 text-primary/80">]</span>
                </div>

                {/* Subtle Glow under link */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover/link:w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover/link:opacity-100 transition-all duration-500" />
              </Link>
            ))}
          </div>

          {/* CTA & Hamburger - Right */}
          <div className="flex items-center gap-8 z-50">
            {ctaLink && (
              <Link
                href={ctaLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center group/cta relative transition-all duration-500 h-9 w-32 overflow-hidden"
                style={{
                  clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
                }}
              >
                {/* Ghost Background System */}
                <div className="absolute inset-0 bg-transparent transition-colors duration-500 group-hover/cta:bg-primary/10" />

                {/* Text Label - Brightens on hover */}
                <span className="relative z-10 text-white/70 font-condensed font-bold tracking-widest uppercase text-sm transition-colors duration-500 group-hover/cta:text-white">
                  {ctaLink.title}
                </span>

                {/* Ghost to Accent Border Transition */}
                <div className="absolute inset-0 border border-white/20 group-hover/cta:border-primary/60 transition-colors duration-500 pointer-events-none" style={{ clipPath: "inherit" }} />
              </Link>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="text-white/70 md:hidden p-2 -mr-2 focus:outline-none hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <AlignJustify size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay — Clean Fullscreen, closes on tap outside */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a]/[0.98] backdrop-blur-md flex flex-col transition-all duration-500 md:hidden
            ${menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
          `}
        onClick={() => setMenuOpen(false)}
      >
        {/* Top spacing to clear the navbar */}
        <div className="h-20" />

        {/* Nav links — centered vertically in remaining space */}
        <nav
          className={`flex-1 flex flex-col items-center justify-center gap-10 px-8 transition-all duration-700 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          {navLinks.map((item, i) => (
            <a
              key={i}
              href={item.url}
              onClick={(e) => handleMobileNav(e, item.url)}
              className="text-white/60 hover:text-white active:text-primary font-condensed text-2xl uppercase tracking-[0.3em] transition-all duration-300 relative cursor-pointer"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* CTA button — pinned to bottom */}
        {ctaLink && (
          <div className="px-8 pb-10 pt-4 flex justify-center">
            <Link
              href={ctaLink.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full max-w-[200px] h-12 flex items-center justify-center border border-primary/40 text-white font-condensed font-bold text-sm tracking-[0.3em] uppercase transition-all duration-500 active:bg-primary/20"
              style={{
                clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
              }}
            >
              {ctaLink.title}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
