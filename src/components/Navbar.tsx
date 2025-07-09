"use client";

import ShowOnScroll from "@/components/ShowOnScroll";

import Content from "@/content/navbar.json";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  alwaysShow?: boolean;
};

export default function Navbar({ alwaysShow }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ShowOnScroll active={!alwaysShow}>
      <div className="fixed w-full p-4 bg-background-dark z-20 flex items-center justify-between">
        {/* Contenitore per Titolo e Link Desktop */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="text-white font-condensed font-bold text-3xl hover:underline">
              {Content.title}
            </h1>
          </Link>
          {/* Link per Desktop: visibili solo da 'md' in su */}
          <div className="hidden md:flex gap-8 my-auto">
            {Content.links.map((item, i) => (
              <a
                key={i}
                href={item.url}
                className="text-foreground-dim hover:underline font-condensed text-2xl"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* Hamburger Icon: visibile solo fino a 'md' */}
        <AlignJustify
          className="text-primary w-[30px] h-[30px] md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {/* Menu a Tendina per Mobile */}
        <div
          className={`absolute top-full left-0 w-full bg-background-dark px-4 pb-4 flex flex-col items-center gap-4 md:hidden transition-transform duration-400 ease-in-out transform -z-1 border-b-2 border-primary ${menuOpen ? "translate-y-0" : "-translate-y-3/2"}
        `}
        >
          {Content.links.map((item, i) => (
            <a
              key={i}
              href={item.url}
              className="text-foreground-dim hover:underline font-condensed text-2xl"
              onClick={() => setMenuOpen(false)} // Optional: chiude il menu al click
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </ShowOnScroll>
  );
}
