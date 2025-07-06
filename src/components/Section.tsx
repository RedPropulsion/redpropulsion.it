import Bounded from "@/components/Bounded";
import RichText from "@/components/RichText";

type Props = {
  title: string;
  body: string;
};

export default function Section({ title, body }: Props) {
  return (
    <Bounded>
      <h2 className="text-gradient text-4xl font-bold text-center mb-6">
        {title}
      </h2>
      <RichText content={body} />
    </Bounded>
  );
}
