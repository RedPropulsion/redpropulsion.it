import { ArrowDown } from "lucide-react";
import Button, { ButtonProps } from "@/components/Button";

function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white w-1 h-1 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

type Props = {
  title: string;
  subtitle: string;
  buttons: ButtonProps[];
};

export default function Landing({ title, subtitle, buttons }: Props) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center relative">
      <Stars />
      <div className="mt-auto z-10 text-center mx-4">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-condensed font-bold uppercase text-gradient mx-auto">
          {title}
        </h1>
        <p className="font-orbitron text-4xl sm:text-5xl md:text-6xl">
          {subtitle}
        </p>
      </div>

      <div className="mt-auto z-10 grid sm:grid-cols-2 justify-center gap-4 sm:gap-12">
        {buttons.map((item, i) => (
          <Button key={i} {...item} />
        ))}
      </div>
      <ArrowDown className="mt-12 mb-auto text-primary w-[50px] h-[50px] animate-bounce" />
      <div className="absolute bottom-0 left-0 right-0 h-[200px] mask-t-from-0 bg-background-dark" />
    </div>
  );
}
