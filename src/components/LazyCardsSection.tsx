"use client";

import dynamic from "next/dynamic";
import type { CardProps } from "./CardsSection";

// Keep the carousel library in a separate chunk, requested only by a cards block.
const CardsSection = dynamic(() => import("./CardsSection"));

export default function LazyCardsSection({ cards }: { cards: CardProps[] }) {
  return <CardsSection cards={cards} />;
}
