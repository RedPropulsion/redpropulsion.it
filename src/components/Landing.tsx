"use client";

import { ArrowDown } from "lucide-react";
import Button, { ButtonProps } from "@/components/Button";

type Props = {
  title: string;
  subtitle: string;
  buttons: ButtonProps[];
};

export default function Landing({ title, subtitle, buttons }: Props) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center relative">
      <div className="mt-auto z-10 text-center mx-4 relative">
        <h1 className="animate-fade-in-up delay-100 text-6xl sm:text-8xl md:text-9xl font-condensed font-bold uppercase text-gradient mx-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {title}
        </h1>
        <p className="animate-fade-in-up delay-300 font-orbitron text-4xl sm:text-5xl md:text-6xl text-white">
          {subtitle}
        </p>
      </div>

      <div className="animate-fade-in-up delay-500 mt-auto z-10 grid sm:grid-cols-2 justify-center gap-4 sm:gap-12">
        {buttons.map((item, i) => (
          <Button key={i} {...item} />
        ))}
      </div>
      <ArrowDown className="animate-fade-in-up delay-700 mt-12 mb-auto text-primary w-[50px] h-[50px] animate-float" />
    </div>
  );
}
