import Image from "next/legacy/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { CarouselType } from "@/types/type";
import Link from "next/link";
import { Raleway } from "next/font/google";
import logo from "@/../public/assets/DesignLogoMpp.svg";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function HeroScreen({ carousel }: { carousel: CarouselType[] }) {
  return (
    <div className="md:items-center md:flex md:justify-between w-dvw md:w-full bg-primary-700">
      <Link
        href="/"
        className="flex justify-center self-center w-full py-4 gap-x-4 bg-neutral-50 flex-row md:hidden">
        <div className="w-2/12">
          <Image src={logo} alt="Lampung Timur" className="w-full h-full" />
        </div>

        <div className="flex flex-col self-center justify-center w-6/12 h-full leading-none">
          <h3
            className={`${raleway.className} font-bold text-[14px] text-secondary-700 py-[4px]`}>
            MAL PELAYANAN PUBLIK
          </h3>

          <h3
            className={`${raleway.className} font-normal text-primary-700 text-[12px]`}>
            Kabupaten Lampung Timur
          </h3>
        </div>
      </Link>

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
                  className="w-full h-full object-cover"
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
