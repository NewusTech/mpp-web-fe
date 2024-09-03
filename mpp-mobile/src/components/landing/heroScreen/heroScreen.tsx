"use client";

import Image from "next/legacy/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { CarouselType } from "@/types/type";

export default function HeroScreen({ carousel }: { carousel: CarouselType[] }) {
  return (
    <div className="md:items-center md:flex md:justify-between h-full w-dvw md:w-full slide-right-animation">
      <div className="w-full md:self-end md:flex max-h-[320px] md:max-h-[680px]">
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            768: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
          }}>
          {carousel.map((image, index) => (
            <SwiperSlide key={index}>
              {/* min-h-[300px] md:min-h-[650px] */}
              <div className="w-screen min-h-[300px] md:min-h-[665px] relative">
                <Image
                  src={image?.image}
                  className="w-full h-full object-cover"
                  alt="Gedung Kabupaten Lampung Timur"
                  layout="fill"
                  // objectFit="cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
