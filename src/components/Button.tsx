export type ButtonProps = {
  title: string;
  url?: string;
  primary?: boolean;
};

export default function Button({ title, url, primary }: ButtonProps) {
  return (
    <a href={url}>
      <div
        className={`${primary ? "rocket-gradient" : "border-primary border-4"} w-fit py-2 px-16 rounded-md text-white text-2xl md:text-4xl font-bold flex items-center font-condensed hover:scale-110 transition-scale ease-in-out duration-200`}
      >
        {title}
      </div>
    </a>
  );
}
