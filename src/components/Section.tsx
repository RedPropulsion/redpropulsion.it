import Bounded from "@/components/Bounded";
import styles from "./Section.module.css";
import RichText from "@/components/RichText";

type Props = {
  title: string;
  body: string;
};

export default function Section({ title, body }: Props) {
  return (
    <div className={styles.section}>
      <Bounded>
        <h2>{title}</h2>
        <RichText content={body} />
      </Bounded>
    </div>
  );
}
