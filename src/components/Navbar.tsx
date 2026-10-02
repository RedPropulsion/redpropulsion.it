"use client";

import Content from "@/content/navbar.json";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollState, setScrollState] = useState({ started: false, glass: false });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelNavigation = useCallback(() => {
    if (navigationTimer.current !== null) clearTimeout(navigationTimer.current);
    navigationTimer.current = null;
  }, []);
  useEffect(() => cancelNavigation, [cancelNavigation]);
  useEffect(() => { cancelNavigation(); }, [pathname, cancelNavigation]);

  // Smooth mobile nav: close menu first, navigate after fade-out
  const handleMobileNav = useCallback((e: React.MouseEvent, url: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !url.startsWith("/")) return;
    e.preventDefault();
    cancelNavigation();
    setMenuOpen(false);
    navigationTimer.current = setTimeout(() => {
      navigationTimer.current = null;
      router.push(url);
    }, 300);
  }, [router, cancelNavigation]);

  useEffect(() => {
    const handleScroll = () => {
      const started = window.scrollY > 0;
      const glass = window.scrollY > 25;
      setScrollState(previous => previous.started === started && previous.glass === glass ? previous : { started, glass });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dual threshold logic
  // showPreAnimation: l'animazione rossa parte istantaneamente al primo scroll
  // showGlass: l'effetto vetro completo e il bordo appaiono poco dopo
  const showPreAnimation = !isHome || scrollState.started;
  const showGlass = !isHome || scrollState.glass;

  const navLinks = Content.links.filter((link) => link.title !== "Join Us");
  const ctaLink = Content.links.find((link) => link.title === "Join Us");

  // Impedisce lo scrolling quando il menu mobile è aperto
  useEffect(() => {
    if (!menuOpen) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const content = document.getElementById("site-content");
    if (content) content.inert = true;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
      }
      if (event.key !== "Tab") return;
      const controls = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])].filter(Boolean) as HTMLElement[];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (content) content.inert = false;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
      if (toggle?.getClientRects().length) toggle.focus();
    };
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
          <div className="min-w-0 z-50">
            <Link
              href="/"
              onClick={(e) => {
                if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                cancelNavigation();
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
                }
                setMenuOpen(false);
              }}
              className="block"
            >
              <span className="text-white font-condensed font-bold text-[clamp(0.9rem,4.5vw,1.5rem)] tracking-[0.15em] sm:tracking-[0.25em] whitespace-nowrap uppercase hover:text-primary transition-all duration-300">
                {Content.title}
              </span>
            </Link>
          </div>

          {/* Nav Links - Center (Desktop) */}
          <nav aria-label="Navigazione principale" className="hidden xl:flex items-center justify-center gap-2 h-full">
            {navLinks.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                onClick={cancelNavigation}
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
          </nav>

          {/* CTA & Hamburger - Right */}
          <div className="flex items-center gap-8 z-50">
            {ctaLink && (
              <Link
                href={ctaLink.url}
                target={ctaLink.url.startsWith("http") ? "_blank" : undefined}
                rel={ctaLink.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hidden xl:flex items-center justify-center group/cta relative transition-all duration-500 h-11 w-32 overflow-hidden"
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
              ref={toggleRef}
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              className="text-white/80 xl:hidden w-11 h-11 flex items-center justify-center shrink-0 hover:text-primary transition-colors cursor-pointer"
              onClick={() => { cancelNavigation(); setMenuOpen(!menuOpen); }}
            >
              {menuOpen ? <X size={24} /> : <AlignJustify size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay — Clean Fullscreen, closes on tap outside */}
      <div
        ref={menuRef}
        id="mobile-menu"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-[#0a0a0a]/[0.98] backdrop-blur-md flex flex-col overflow-y-auto pt-24 transition-all duration-500 xl:hidden
            ${menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
          `}
        onClick={() => setMenuOpen(false)}
      >
        {/* Top spacing to clear the navbar */}

        {/* Nav links — centered vertically in remaining space */}
        <nav
          aria-label="Navigazione mobile"
          className={`flex-1 flex flex-col items-center justify-center gap-3 sm:gap-5 px-8 transition-all duration-700 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
        >
          {navLinks.map((item, i) => (
            <a
              key={i}
              href={item.url}
              onClick={(e) => handleMobileNav(e, item.url)}
              className="text-white/80 hover:text-white active:text-primary min-h-11 flex items-center font-condensed text-2xl uppercase tracking-[0.3em] transition-all duration-300 relative cursor-pointer"
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
              target={ctaLink.url.startsWith("http") ? "_blank" : undefined}
              rel={ctaLink.url.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => handleMobileNav(e, ctaLink.url)}
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
