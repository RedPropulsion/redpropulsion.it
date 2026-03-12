import Section from "@/components/Section";
import CardsSection, { CardProps } from "./CardsSection";
import BentoSection, { BentoSectionProps } from "./BentoSection";

const blockTypes = ["text_section", "cards_section", "bento_section"];

type BlockContent =
  | {
    type: "text_section";
    title: string;
    body: string;
  }
  | {
    type: "cards_section";
    cards: CardProps[];
  }
  | ({
    type: "bento_section";
  } & BentoSectionProps);

export default function Block({
  content,
}: {
  content: BlockContent;
}): React.ReactNode {
  switch (content.type) {
    case "text_section": {
      return <Section {...content} />;
    }
    case "cards_section": {
      return <CardsSection cards={content.cards} />;
    }
    case "bento_section": {
      return <BentoSection {...content} />;
    }
  }
}

export function validateBlockContent(
  content: { type: string } & Record<string, unknown>,
): asserts content is BlockContent {
  if (blockTypes.indexOf(content.type) === -1) {
    throw `Invalid block content ${content.type}`;
  }
}
