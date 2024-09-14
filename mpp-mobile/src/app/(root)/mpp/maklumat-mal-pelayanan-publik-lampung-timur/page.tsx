"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, Grid } from "swiper/modules";
import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import CardLogoPendukung from "@/components/mpp/cardFasilitas/cardLogoPendukung";
import { InstansiMaklumatType, MaklumatMppType } from "@/types/type";
import MaklumatMppFetch from "@/components/fetching/MaklumatMpp/logoMaklumat";
import { RichTextDisplay } from "@/components/richTextDisplay/richTextDisplay";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";

export default function MaklumatMPPScreen() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [maklumat, setMaklumat] = useState<MaklumatMppType>();

  const fetchMaklumat = async () => {
    try {
      const response = await MaklumatMppFetch();

      setMaklumat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaklumat();
  }, []);

  console.log(maklumat, "ini maklumat");

  return (
    <div className="bg-primary-50 flex flex-col h-full justify-center items-center pt-2 mt-12 md:mt-[48px] md:mb-44 mx-5 md:mx-[150px] rounded-lg">
      <div className="flex flex-col items-center gap-y-10 w-full self-center justify-center bg-primary-50 mt-[14px] md:mt-[48px] mb-[35px] md:mb-0 md:pb-10">
        <div className="flex flex-row w-8/12 md:w-6/12 justify-center self-center items-center gap-x-5">
          <div className="w-4/12 md:w-2/12 h-full">
            {maklumat && maklumat.logo.logo_lamtim && (
              <Image
                src={maklumat?.logo?.logo_lamtim}
                alt="Lampung Timur"
                className="w-full h-full"
                width={200}
                height={200}
              />
            )}
          </div>

          <div className="flex flex-col w-full justify-center items-center">
            <h2 className="text-neutral-900 text-center font-semibold text-[12px] md:text-[20px]">
              MAL PELAYANAN PUBLIK
            </h2>

            <h2 className="text-neutral-900 text-center font-semibold text-[12px] md:text-[20px]">
              KABUPATEN LAMPUNG TIMUR
            </h2>
          </div>

          <div className="w-4/12 md:w-2/12 h-full">
            {maklumat && maklumat.logo.logo_mpp && (
              <Image
                src={maklumat.logo.logo_mpp}
                alt="Lampung Timur"
                className="w-full h-full"
                width={200}
                height={200}
              />
            )}
          </div>
        </div>

        <div className="w-full justify-center flex flex-row">
          <h2 className="font-bold text-primary-800 md:text-[42px] underline">
            MAKLUMAT PELAYANAN
          </h2>
        </div>

        <div className="w-full flex flex-col text-[12px] md:text-[18px] px-32 gap-y-10">
          {maklumat && (
            <RichTextDisplay content={maklumat.maklumat.desc} keys={false} />
          )}
        </div>

        <div className="w-full flex flex-row flex-wrap justify-between self-start gap-x-10 p-5 md:px-20">
          {!isMobile ? (
            <div className="w-full flex flex-row h-full">
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
                spaceBetween={50}
                slidesPerView={8}
                loop={true}
                autoplay={{ delay: 3000 }}>
                {maklumat?.instansi &&
                  maklumat.instansi?.map(
                    (item: InstansiMaklumatType, i: number) => {
                      return (
                        <SwiperSlide key={i}>
                          <div className="slide-up-animation flex items-center justify-center p-2">
                            <div className="w-full h-full">
                              <Image
                                src={item?.image}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover rounded-md"
                                alt={item.name}
                              />
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    }
                  )}
              </Swiper>
            </div>
          ) : (
            <div className="w-full flex flex-row h-full">
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
                spaceBetween={10}
                slidesPerView={4}
                loop={true}
                autoplay={{ delay: 3000 }}>
                {maklumat?.instansi &&
                  maklumat.instansi?.map(
                    (item: InstansiMaklumatType, i: number) => {
                      return (
                        <SwiperSlide key={i}>
                          <div className="slide-up-animation flex items-center justify-center p-2">
                            <Image
                              src={item?.image}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover rounded-md"
                              alt={item.name}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    }
                  )}
              </Swiper>
            </div>
          )}

          {/* <CardLogoPendukung /> */}
        </div>
      </div>
    </div>
  );
}
