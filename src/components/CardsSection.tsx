import RichText from "./RichText";

import styles from "./CardsSection.module.css";
import Bounded from "./Bounded";

export type CardProps = {
  title: string;
  body: string;
  button: {
    title: string;
    link: string;
  };
};

function Card({ title, body, button }: CardProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <RichText content={body} />
      <a href={button.link} className={styles.button}>
        {button.title}
      </a>
    </div>
  );
}

type Props = {
  cards: CardProps[];
};

export default function CardsSection({ cards }: Props) {
  return (
    <Bounded>
      <div className={styles.carousel}>
        <div className={styles.container}>
          {cards.map((item, i) => (
            <div
              key={i}
              style={{
                scrollSnapAlign: "center",
              }}
            >
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
}
