import Image from "next/legacy/image";
import React from "react";
import image from "@/../../public/assets/undraw_synchronize_re_4irq.svg";

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
  return (
    <section className="flex flex-col justify-center mt-4 md:mt-0 mx-5 md:mx-8 md:rounded-xl md:pt-[25px]">
      <div className="flex flex-col md:flex-row w-full gap-x-4 mb-3">
        <div className="flex flex-col bg-primary-200 w-full rounded-xl">
          <div className="bg-primary-700 rounded-t-xl">
            <h4 className="text-primary-50 text-[20px] md:text-[26px] px-8 py-4 font-semibold">
              Video Mal Pelayanan Publik
            </h4>
          </div>

          <div className="m-4 md:w-[650px] md:h-full">
            {video && (
              <video
                className="md:w-full md:h-full object-cover"
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

        <div className="flex flex-col bg-primary-200 w-full rounded-xl mt-3 md:mt-0">
          <div className="bg-primary-700 rounded-t-xl">
            <h4 className="text-primary-50 text-[20px] md:text-[26px] px-8 py-4 font-semibold">
              Alur Pelayanan
            </h4>
          </div>

          <div className="m-4 md:w-[650px] md:h-full">
            {alur && (
              <Image
                src={alur?.image}
                className="w-full h-[200px] md:h-full object-contain"
                width={960}
                height={350}
                alt="permohonan & antrian"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-x-5 md:gap-x-5 w-full mt-5 mb-5">
        <div className="flex flex-col w-full md:w-2/4 md:gap-y-5">
          <div className="bg-primary-200 p-6 md:p-8 rounded-xl flex flex-col w-full">
            <h3 className="text-primary-800 text-[20px] md:text-[26px] text-center md:mb-8 font-semibold">
              Pemohonan Layanan & Antrian Online
            </h3>

            <Image
              src={image}
              className="w-full h-[140px] md:h-[190px]"
              alt="permohonan & antrian"
            />

            <p className="md:text-[12px] my-4">
              "Permudah urusan Anda! Ajukan permohonan layanan dan booking
              antrian online sekarang."
            </p>

            <div className="flex flex-col px-10 md:justify-between w-full items-center gap-y-2 self-center">
              <Button
                variant="success"
                className="w-full text-neutral-50 justify-between px-5">
                <Landmark className="w-5" />

                <p className="text-[16px]">Permohonan Layanan</p>
              </Button>

              <Button
                variant="secondary"
                className="bg-secondary-700 px-5 justify-between hover:bg-secondary-600 text-neutral-50 w-4/5">
                <Ticket className="w-5" />

                <p className="text-[16px]">Booking Antrian</p>
              </Button>
            </div>
          </div>

          <div className="bg-secondary-200 p-8 rounded-xl mt-2 md:mt-0 flex flex-col w-full">
            <h3 className="text-secondary-800 text-[20px] md:text-[26px] text-center mb-8 font-semibold">
              Pengaduan
            </h3>

            <Image
              src={image}
              className="w-full h-[140px] md:h-[190px]"
              alt="permohonan & antrian"
            />

            <p className="md:text-[12px] my-4">
              Tingkatkan pelayanan publik di web, sampaikan keluhan Anda di sini
              untuk pelayanan yang lebih baik.
            </p>

            <div className="flex flex-col px-10 justify-between w-full items-center gap-y-2 self-center">
              <Button
                variant="secondary"
                className="bg-secondary-700 px-12 justify-between hover:bg-secondary-600 text-neutral-50 w-full">
                <Send className="w-5" />

                <p className="text-[16px]">Pengaduan</p>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-10 md:px-14 py-8 bg-primary-200 w-full rounded-xl">
          <h3 className="text-primary-800 text-[20px] md:text-[32px] mb-8 font-semibold">
            Fasilitas Mal Pelayanan Publik
          </h3>

          <Accordion type="single" collapsible>
            {facilities &&
              facilities.map((facility: FacilityType, i: number) => {
                return (
                  <AccordionItem key={i} className="mb-2" value={`item-${i}`}>
                    <AccordionTrigger className="md:h-[60px]">
                      {facility.title}
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
                      <div className="md:w-full md:h-full">
                        <Image
                          src={facility.image}
                          className="md:w-full md:h-full object-cover"
                          alt="permohonan & antrian"
                          width={960}
                          height={190}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>

          <div className="flex self-end h-full">
            <p className="self-end border-b text-primary-800">
              Lihat Selengkapnya...
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-primary-200 rounded-xl p-6 md:p-8">
        <h3 className="text-[26px] text-center md:text-start md:text-[32px] mb-5 text-primary-800 font-semibold">
          Aplikasi Pendukung Mal Pelayanan Publik
        </h3>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-x-2 gap-y-4">
          {apps.map((app: AppType, i: number) => {
            return <CardAplikasiPendukung key={i} app={app} />;
          })}
        </div>
      </div>
    </section>
  );
}
