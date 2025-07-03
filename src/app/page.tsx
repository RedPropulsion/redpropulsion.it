import Block, { validateBlockContent } from "@/components/Block";
import Landing from "@/components/Landing";

import Content from "@/content/index.json";

export function generateMetadata() {
  return {
    title: Content.title,
    description: Content.description,
  };
}

export default function Home() {
  return (
    <>
      <Landing {...Content.landing} />
      {Content.sections.map((content, i) => {
        validateBlockContent(content);
        return <Block content={content} key={i} />;
      })}
    </>
  );
}
