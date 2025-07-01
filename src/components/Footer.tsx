import styles from "./Footer.module.css";
import RichText from "./RichText";
import Image from "next/image";

type Props = {
  title: string;
  body: string;
  social_links: { name: string; link: string; icon: string }[];
};

export default function Footer({ title, body, social_links }: Props) {
  return (
    <div className={styles.main}>
      <h1>{title}</h1>
      <RichText content={body} />
      <ul>
        {social_links.map((item) => (
          <li key={item.name}>
            <a href={item.link}>
              <Image src={item.icon} alt={item.name} width={50} height={50} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
