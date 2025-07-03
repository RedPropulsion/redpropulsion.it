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

import styles from "./CardsSection.module.css";

export type CardProps = {
  title: string;
  body: string;
  button: {
    title: string;
    link: string;
  };
};

function Card({ title, body, button }: CardProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <RichText content={body} />
      <a href={button.link} className={styles.button}>
        {button.title}
      </a>
    </div>
  );
}

type Props = {
  cards: CardProps[];
};

export default function CardsSection({ cards }: Props) {
  return (
    <Bounded>
      <Swiper
        modules={[Navigation, Pagination, Mousewheel, EffectCoverflow]}
        navigation
        pagination
        mousewheel
        slidesPerView={"auto"}
        spaceBetween={30}
        className={styles.swiper}
        effect="coverflow"
        centeredSlides
      >
        {cards.map((item, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            <Card {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Bounded>
  );
}
