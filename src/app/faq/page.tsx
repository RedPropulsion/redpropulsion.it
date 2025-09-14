import Bounded from "@/components/Bounded";
import Content from "@/content/faq.json";

export function generateMetadata() {
  return {
    title: "FAQ",
    description: "Frequently Asked Question of Red Propulsion team",
  };
}

export default function Page() {
  return (
    <div className="pt-20">
      <Bounded>
        <h1 className="text-5xl font-condensed font-bold text-gradient">
          F.A.Q.s
        </h1>

        <div className="my-10 grid md:grid-cols-2 gap-x-8">
          {Content.faq.flatMap((item) => {
            return [
              <div
                key={item.question + "1"}
                className="text-2xl font-orbitron text-gray-200 my-4 md:my-12"
              >
                {item.question}
              </div>,
              <div
                key={item.question + "2"}
                className="text-xl border-l-4 pl-2 border-rocket font-condensed leading-8 mb-8 md:my-12"
              >
                {item.answer}
              </div>,
            ];
          })}
        </div>
      </Bounded>
    </div>
  );
}
