"use client";

import Image from "next/legacy/image";
import React, { useState } from "react";
import permohonanantrian from "@/../../public/assets/permohonan&antrian.png";
import pengaduan from "@/../../public/assets/pengaduan.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { Landmark, Send, Ticket } from "lucide-react";
import CardAplikasiPendukung from "../landing/aboutScreen/cardAplikasiPendukung/cardAplikasiPendukung";
import { AlurType, AppType, FacilityType, VideoType } from "@/types/type";
import Link from "next/link";
import alur1 from "@/../../public/assets/alurmpplamtim.jpg";
import alur2 from "@/../../public/assets/alurmpplamtim.jpg";

export default function MppNext({
  facilities,
  video,
  alur,
  apps,
}: {
  facilities: FacilityType[];
  video: VideoType;
  alur: AlurType;
  apps: AppType[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const alurfix = [alur1, alur2];

  return (
    <section className="flex flex-col justify-center mt-4 md:mt-0 mx-5 md:mx-8 md:rounded-xl md:pt-[25px]">
      <div className="flex flex-col md:flex-row w-full gap-x-2 mb-3">
        <div className="flex flex-col bg-primary-200 w-full md:w-6/12 rounded-xl">
          <div className="bg-primary-700 rounded-t-xl">
            <h4 className="text-primary-50 text-[20px] md:text-[22px] px-8 py-4 font-semibold">
              Video Mal Pelayanan Publik
            </h4>
          </div>

          <div className="p-4 md:h-full">
            {video && (
              <video
                className="md:w-full md:h-full object-cover rounded-xl"
                width={650}
                height={310}
                autoPlay
                src={video.video}
                muted
                controls>
                <source src={video.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <div className="flex flex-col bg-primary-200 w-full md:w-6/12 rounded-xl mt-3 md:mt-0">
          <div className="bg-primary-700 rounded-t-xl">
            <h4 className="text-primary-50 text-[20px] md:text-[22px] px-8 py-4 font-semibold">
              Alur Pelayanan
            </h4>
          </div>

          <div className="w-full p-4 md:self-end md:flex md:h-full rounded-xl">
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
              {alurfix.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="p-4 w-full md:h-full rounded-xl">
                    {alur && (
                      <Image
                        src={image}
                        className="w-full h-[200px] md:h-full object-contain rounded-xl"
                        width={960}
                        height={350}
                        alt="permohonan & antrian"
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-x-5 md:gap-x-5 w-full mt-5 mb-5">
        <div className="flex flex-col w-full md:w-2/4 md:gap-y-5">
          <div className="bg-primary-200 p-6 md:p-8 rounded-xl flex flex-col w-full">
            <h3 className="text-primary-800 text-[20px] md:text-[26px] text-center md:mb-8 font-semibold">
              Pemohonan Layanan & Antrian Online
            </h3>

            <div className="w-6/12 h-full flex justify-center items-center self-center">
              <Image
                src={permohonanantrian}
                className="w-full h-full object-cover"
                alt="permohonan & antrian"
              />
            </div>

            <p className="md:text-[12px] text-center my-4">
              "Permudah urusan Anda! Ajukan permohonan layanan dan booking
              antrian online sekarang."
            </p>

            <div className="flex flex-col md:justify-between w-full items-center gap-y-2 self-center">
              <Button
                variant="success"
                className="w-10/12 text-neutral-50 px-5">
                <Link
                  href={"/instansi"}
                  className="w-full flex justify-center items-center gap-x-4">
                  <Landmark className="w-5" />

                  <p className="text-[16px]">Permohonan Layanan</p>
                </Link>
              </Button>

              <Button
                variant="secondary"
                className="bg-secondary-700 hover:bg-secondary-600 text-neutral-50 w-10/12 px-5">
                <Link
                  href={"/instansi"}
                  className="w-full flex justify-center items-center gap-x-4">
                  <Ticket className="w-5" />

                  <p className="text-[16px]">Booking Antrian</p>
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-secondary-200 p-8 rounded-xl mt-2 md:mt-0 flex flex-col w-full">
            <h3 className="text-secondary-800 text-[20px] md:text-[26px] text-center mb-8 font-semibold">
              Pengaduan
            </h3>

            <div className="w-6/12 h-full flex items-center justify-center self-center">
              <Image
                src={pengaduan}
                className="w-full h-full object-cover"
                alt="permohonan & antrian"
              />
            </div>

            <p className="md:text-[12px] text-center my-4">
              Tingkatkan pelayanan publik di web, sampaikan keluhan Anda di sini
              untuk pelayanan yang lebih baik.
            </p>

            <div className="flex flex-col px-10 justify-between w-full items-center gap-y-2 self-center">
              <Button
                variant="secondary"
                className="bg-secondary-700 px-6 hover:bg-secondary-600 text-neutral-50 w-10/12">
                <Link
                  href={"/pengaduan"}
                  className="w-full flex justify-center items-center gap-x-6">
                  <Send className="w-5 h-5" />

                  <p className="text-[16px]">Pengaduan</p>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-10 md:px-14 py-8 mt-4 md:mt-0 bg-primary-200 w-full rounded-xl">
          <h3 className="text-primary-800 text-[20px] md:text-[26px] mb-8 font-semibold">
            Fasilitas Mal Pelayanan Publik
          </h3>

          <Accordion type="single" collapsible>
            {facilities &&
              facilities.map((facility: FacilityType, i: number) => {
                return (
                  <AccordionItem key={i} className="mb-2" value={`item-${i}`}>
                    <AccordionTrigger className="md:h-full">
                      {facility.title}
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
                      <div
                        className="w-full md:h-4/5 flex justify-center items-center"
                        onClick={openModal}>
                        <Image
                          src={facility.image}
                          className="w-full h-full object-cover rounded-xl"
                          alt="permohonan & antrian"
                          layout="intrinsic"
                          width={660}
                          height={390}
                        />
                      </div>

                      {isModalOpen && (
                        <div
                          className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-90 z-50"
                          onClick={handleBackdropClick}>
                          <div
                            className="relative w-8/12 h-1/3 md:h-4/6 bg-neutral-50 rounded-xl p-4"
                            onClick={(e) => e.stopPropagation()}>
                            <Image
                              src={facility.image}
                              alt={facility.title}
                              layout="fill"
                              width={430}
                              height={367}
                              className="w-full h-full object-fit rounded-xl"
                            />
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>

          <div className="flex self-end h-full">
            <Link
              href={"/mpp/fasilitas"}
              className="self-end border-b text-[12px] md:text-[16px] text-primary-800">
              Lihat Selengkapnya...
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-primary-200 rounded-xl p-6 md:p-8">
        <h3 className="text-[20px] text-center md:text-start md:text-[26px] mb-5 text-primary-800 font-semibold">
          Aplikasi Pendukung Mal Pelayanan Publik
        </h3>

        <div className="flex flex-col md:flex-none md:grid md:grid-cols-3 gap-x-2 gap-y-4">
          {apps.map((app: AppType, i: number) => {
            return <CardAplikasiPendukung key={i} app={app} />;
          })}
        </div>
      </div>
    </section>
  );
}
