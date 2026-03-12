"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/effect-coverflow";

import RichText from "./RichText";
import Bounded from "./Bounded";
import Link from "next/link";

export type CardProps = {
  title: string;
  body: string;
  button: {
    title: string;
    link: string;
  };
};

function Card({ title, body, button }: CardProps) {
  const isExternal = button.link.startsWith("http");
  return (
    <div className="group flex flex-col h-full min-h-[400px] p-8 rounded-[2rem] border border-white/5 bg-[#0a0a0a]/40 backdrop-blur-xl transition-all duration-700 hover:border-primary/50 hover:bg-[#0a0a0a]/60 hover:shadow-[0_0_40px_rgba(211,47,47,0.15)] relative overflow-hidden">
      {/* Background Glow - Subtle & Pulsing */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute -inset-[1px] bg-gradient-to-tr from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none" />

      <h3 className="font-condensed text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors duration-500 relative z-10">
        {title}
      </h3>
      <div className="flex-grow font-condensed text-foreground-dim text-lg leading-relaxed relative z-10">
        <RichText content={body} />
      </div>
      <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
        <Link
          href={button.link}
          className="inline-block w-full py-4 text-center rounded-full font-condensed font-bold text-white tracking-widest uppercase transition-all duration-500 border border-primary/30 bg-white/5 hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(211,47,47,0.4)]"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {button.title}
        </Link>
      </div>
    </div>
  );
}

type Props = {
  cards: CardProps[];
};

export default function CardsSection({ cards }: Props) {
  return (
    <Bounded>
      <div className="w-full py-16">
        <Swiper
          modules={[Navigation, Pagination, Mousewheel, EffectCoverflow]}
          navigation
          pagination={{ clickable: true }}
          mousewheel={{ forceToAxis: true }}
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1280: { slidesPerView: 3, spaceBetween: 40 },
          }}
          effect="coverflow"
          centeredSlides
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          className="w-full !pb-20"
        >
          {cards.map((item, i) => (
            <SwiperSlide key={i} className="!h-auto flex">
              <Card {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Bounded>
  );
}
