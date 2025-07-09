import Block, { validateBlockContent } from "@/components/Block";
import Landing from "@/components/Landing";
import Sponsors from "@/components/Sponsors";

import Content from "@/content/index_page.json";

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
      <Sponsors />
      {Content.sections.map((content, i) => {
        validateBlockContent(content);
        return <Block content={content} key={i} />;
      })}
    </>
  );
}
