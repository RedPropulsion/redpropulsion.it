import { ArrowDown } from "lucide-react";
import RichText from "@/components/RichText";

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
};

export default function Landing({ title, subtitle }: Props) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center relative">
      <Stars />
      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-8xl w-min font-bold uppercase text-gradient mb-4 mx-auto">
          {title}
        </h1>
        <div className="bigger-rich">
          <RichText content={subtitle} />
        </div>
      </div>
      <ArrowDown className="mt-12 text-primary w-[50px] h-[50px] animate-bounce" />
      <div className="absolute bottom-0 left-0 right-0 h-[200px] mask-t-from-0 bg-background-dark" />
    </div>
  );
}
