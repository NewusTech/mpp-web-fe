import Image from "next/image";
import gedung from "@/../public/assets/kab-lamtim.jpg";
import berita from "@/../public/assets/berita.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function HeroScreen() {
  const images = [gedung, berita];

  return (
    <div className="md:px-[40px] md:pb-[65px] md:items-center md:flex md:justify-between w-dvw bg-gradient-to-tr from-[#FAEBBC] from-[-20%] to-[#7bba78] to-35%">
      <div className="flex flex-col px-[35px]">
        <h6 className="text-secondary-700 font-semibold md:text-[48px]">
          Selamat Datang
        </h6>

        <p className="text-neutral-50 text-[12px] font-normal md:text-[26px]">
          di Mal Pelayanan Publik Lampung Timur
        </p>
      </div>

      <div className="pt-[20px] md:w-[50%] md:self-end md:flex md:pr-[35px]">
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
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[300px] md:h-[450px]">
                <Image
                  src={image}
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
