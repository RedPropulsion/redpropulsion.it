import { ArrowDown } from "lucide-react";
import styles from "./Landing.module.css";
import RichText from "@/components//RichText";

function Stars() {
  return (
    <div className={styles.starsContainer}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className={styles.star}
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
    <div className={styles.landing}>
      <Stars />
      <div className={styles.textContainer}>
        <h1>{title}</h1>
        <RichText content={subtitle} />
      </div>
      <ArrowDown className={styles.arrowDown} />
      <div className={styles.transition} />
    </div>
  );
}
