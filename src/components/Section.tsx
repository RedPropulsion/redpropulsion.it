import Bounded from "@/components/Bounded";
import RichText from "@/components/RichText";

type Props = {
  title: string;
  body: string;
};

export default function Section({ title, body }: Props) {
  return (
    <Bounded>
      <h2 className="section-title text-center">
        {title}
      </h2>
      <RichText content={body} />
    </Bounded>
  );
}
