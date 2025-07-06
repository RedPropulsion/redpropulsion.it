import ShowOnScroll from "@/components/ShowOnScroll";

import Content from "@/content/navbar.json";
import Link from "next/link";

type Props = {
  alwaysShow?: boolean;
};

export default function Navbar({ alwaysShow }: Props) {
  return (
    <ShowOnScroll active={!alwaysShow}>
      <div className="fixed w-full p-4 bg-background-dark z-100 flex">
        <Link href="/">
          <h1 className="text-white font-bold mr-4 text-3xl hover:underline">
            {Content.title}
          </h1>
        </Link>
        <div className="flex align-center gap-4 my-auto">
          {Content.links.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="text-foreground-dim hover:underline"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </ShowOnScroll>
  );
}
