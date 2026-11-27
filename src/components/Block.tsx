import Section from "@/components/Section";
import type { CardProps } from "./CardsSection";
import CardsSection from "./LazyCardsSection";
import BentoSection, { type BentoSectionProps } from "./BentoSection";

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
  content: { type: string } & Record<string, unknown>;
}): React.ReactNode {
  const block = content as BlockContent;
  switch (block.type) {
    case "text_section": {
      return <Section {...block} />;
    }
    case "cards_section": {
      return <CardsSection cards={block.cards} />;
    }
    case "bento_section": {
      return <BentoSection {...block} />;
    }
  }
}
