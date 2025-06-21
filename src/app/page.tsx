import CardsSection, { CardProps } from "@/components/CardsSection";
import Landing from "@/components/Landing";
import Section from "@/components/Section";

import Content from "@/content/index.json";

export function generateMetadata() {
  return {
    title: Content.title,
    description: Content.description,
  };
}

const blockTypes = ["text_section", "cards_section"];

type BlockContent =
  | {
      type: "text_section";
      title: string;
      body: string;
    }
  | {
      type: "cards_section";
      cards: CardProps[];
    };

function Block({ content }: { content: BlockContent }): React.ReactNode {
  switch (content.type) {
    case "text_section": {
      return <Section {...content} />;
    }
    case "cards_section": {
      return <CardsSection cards={content.cards} />;
    }
  }
}

function validateBlockContent(
  content: { type: string } & Record<string, unknown>,
): asserts content is BlockContent {
  if (blockTypes.indexOf(content.type) === -1) {
    throw `Invalid block content ${content.type}`;
  }
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
