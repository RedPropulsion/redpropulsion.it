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
            <Image src={item.icon} alt={item.name} width={100} height={100} />
          </li>
        ))}
      </ul>
    </div>
  );
}
