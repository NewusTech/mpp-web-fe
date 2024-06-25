import Image from "next/image";
import gedung from "@/../public/assets/kab-lamtim.jpg";
import kantor from "@/../public/assets/kantor bupati.jpg";
import bupati from "@/../public/assets/inspektorat.jpg";
import mpp from "@/../public/assets/mpp lamtim2.jpeg";
import lamtim from "@/../public/assets/Lampung.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

type CarouselType = {
  image: string;
}[];

export default function HeroScreen({ carousel }: { carousel: CarouselType }) {
  const images = [gedung, bupati, kantor, mpp, lamtim];

  return (
    <div className="md:items-center md:flex md:justify-between w-dvw md:w-full bg-primary-700">
      <div className="flex flex-col px-[35px] pb-6 md:hidden">
        <h6 className="text-secondary-700 font-semibold md:text-[48px]">
          Selamat Datang
        </h6>

        <p className="text-neutral-50 text-[12px] font-normal md:text-[26px]">
          di Mal Pelayanan Publik Lampung Timur
        </p>
      </div>

      <div className="w-full md:self-end md:flex md:h-full">
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
              <div className="w-full h-[300px] md:h-[650px]">
                <Image
                  src={image.image}
                  className="w-full h-full"
                  alt="Gedung Kabupaten Lampung Timur"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
