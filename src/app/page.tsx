import Block, { validateBlockContent } from "@/components/Block";
import Landing from "@/components/Landing";
import ScrollReveal from "@/components/ScrollReveal";
import Stats from "@/components/Stats";

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
      {Content.sections.map((content, i) => {
        validateBlockContent(content);
        return (
          <ScrollReveal key={i}>
            <Block content={content} />
          </ScrollReveal>
        );
      })}
      <ScrollReveal>
        <Stats statistics={Content.statistics} />
      </ScrollReveal>
    </>
  );
}
