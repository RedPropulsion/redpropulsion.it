import ShowOnScroll from "@/components/ShowOnScroll";
import styles from "./Navbar.module.css";

import Content from "@/content/navbar.json";
import Link from "next/link";

type Props = {
  alwaysShow?: boolean;
};

export default function Navbar({ alwaysShow }: Props) {
  return (
    <ShowOnScroll active={!alwaysShow}>
      <div className={styles.navbar}>
        <Link href="/">
          <h1>{Content.title}</h1>
        </Link>
        <div className={styles.linkContainer}>
          {Content.links.map((item, i) => (
            <a key={i} href={item.link}>
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </ShowOnScroll>
  );
}
