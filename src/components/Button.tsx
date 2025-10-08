"use client";

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
  if (url === "scroll") {
    return (
      <div
        className={`${primary ? "rocket-gradient" : "border-primary border-4"} w-full py-2 px-16 rounded-md text-white text-2xl md:text-4xl font-bold flex items-center font-condensed hover:scale-110 transition-scale ease-in-out duration-200 justify-center`}
        onClick={scrollDown}
      >
        {title}
      </div>
    );
  }

  return (
    <a href={url}>
      <div
        className={`${primary ? "rocket-gradient" : "border-primary border-4"} w-full py-2 px-16 rounded-md text-white text-2xl md:text-4xl font-bold flex items-center font-condensed hover:scale-110 transition-scale ease-in-out duration-200`}
      >
        {title}
      </div>
    </a>
  );
}
