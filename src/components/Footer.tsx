import RichText from "./RichText";
import Image from "next/image";

type Props = {
  title: string;
  body: string;
  social_links: { name: string; url: string; icon: string }[];
};

export default function Footer({ title, body, social_links }: Props) {
  return (
    <div className="w-full bg-background-dark text-foreground-light p-6 text-center md:text-left md:p-8">
      <h1 className="font-bold text-3xl mb-4">{title}</h1>
      <RichText content={body} />
      <ul className="mt-4 gap-4 flex justify-center md:justify-start">
        {social_links.map((item) => (
          <li key={item.name}>
            <a href={item.url}>
              <Image src={item.icon} alt={item.name} width={50} height={50} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
