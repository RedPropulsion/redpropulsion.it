import Block from "@/components/Block";
import Landing from "@/components/Landing";
import ScrollReveal from "@/components/ScrollReveal";
import Stats from "@/components/Stats";

import Content from "@/content/index_page.json";

export function generateMetadata() {
  return {
    title: Content.title,
    description: Content.description,
    alternates: { canonical: "/" },
  };
}

export default function Home() {
  return (
    <main>
      <Landing {...Content.landing} />
      {Content.sections.map((content, i) => {

        return (
          <ScrollReveal key={i}>
            <Block content={content} />
          </ScrollReveal>
        );
      })}
      <ScrollReveal>
        <Stats statistics={Content.statistics} />
      </ScrollReveal>
    </main>
  );
}
