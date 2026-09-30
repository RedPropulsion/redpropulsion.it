import Section from "@/components/Section";
import type { CardProps } from "./CardsSection";
import CardsSection from "./LazyCardsSection";
import { validateContentBlock } from "@/lib/content-validation.mjs";
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
  validateBlockContent(content);
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

function validateBlockContent(
  content: { type: string } & Record<string, unknown>,
): asserts content is BlockContent {
  validateContentBlock(content);
}
