import Image from "next/image";
import image from "@/../../public/assets/undraw_synchronize_re_4irq.svg";
import foto from "@/../../public/assets/undraw_login_re_4vu2.svg";
import picture from "@/../../public/assets/undraw_back_home_nl-5-c.svg";
import { Button } from "@/components/ui/button";
import { Landmark, Send, Ticket } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CardAplikasiPendukung from "./cardAplikasiPendukung/cardAplikasiPendukung";

interface InfoLandingType {
  infoLanding: {
    instansiCount: string;
    layananCount: string;
    permohonanCountToday: string;
  };
}

export default function AboutScreen({ infoLanding }: InfoLandingType) {
  const accordions = [
    {
      title: "Ruang Tunggu",
      image: image,
    },
    {
      title: "Mushola",
      image: foto,
    },
    {
      title: "Charging Station",
      image: picture,
    },
  ];
  return (
    <div className="flex flex-col justify-center mt-[14px] mx-5 md:mx-8 md:mt-8 md:rounded-xl md:pt-[25px]">
      <div className="flex flex-col justify-center bg-primary-200 py-5 md:py-8 rounded-xl">
        <div className="grid grid-cols-4 mx-4 gap-1 md:gap-x-5">
          <div className="flex w-full">
            <div className="grid grid-rows-2 place-items-center items-center p-2 justify-center w-full h-full bg-neutral-50 rounded-xl shadow-lg md:w-full md:h-[215px]">
              <h5 className="text-[20px] text-primary-700 self-end font-semibold md:text-[40px]">
                {infoLanding.instansiCount}
              </h5>

              <p className="text-[12px] md:text-[20px] self-start text-primary-700 font-semibold text-center">
                Jumlah Instansi
              </p>
            </div>
          </div>

          <div className="flex w-full">
            <div className="grid grid-rows-2 place-items-center items-center px-2 justify-center w-full h-full bg-neutral-50 rounded-xl shadow-lg md:w-full md:h-[215px]">
              <h5 className="text-[20px] text-secondary-700 self-end font-semibold md:text-[40px]">
                {infoLanding.layananCount}
              </h5>

              <p className="text-[12px] md:text-[20px] self-start text-secondary-700 font-semibold text-center">
                Jumlah Layanan
              </p>
            </div>
          </div>

          <div className="flex w-full">
            <div className="grid grid-rows-2 place-items-center items-center px-2 justify-center w-full h-full bg-neutral-50 rounded-xl shadow-lg md:w-full md:h-[215px]">
              <h5 className="text-[20px] text-primary-700 self-end font-semibold md:text-[40px]">
                18
              </h5>

              <p className="text-[12px] md:text-[20px] self-start text-primary-700 font-semibold text-center">
                Jumlah Antrian
              </p>
            </div>
          </div>

          <div className="flex w-full">
            <div className="grid grid-rows-2 place-items-center items-center px-2 justify-center w-full h-full bg-neutral-50 rounded-xl shadow-lg md:w-full md:h-[215px]">
              <h5 className="text-[20px] text-secondary-700 self-end font-semibold md:text-[40px]">
                {infoLanding.permohonanCountToday}
              </h5>

              <p className="text-[12px] md:text-[20px] self-start text-secondary-700 font-semibold text-center">
                Jumlah Permohonan
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary-200 mt-5 py-5 rounded-xl">
        <div className="grid grid-rows-1 mt-[28px] md:mt-0 space-y-4 mx-[30px]">
          <h3 className="text-start text-[16px] text-secondary-800 font-semibold md:text-[32px]">
            Tentang Mal Pelayanan Publik
          </h3>

          <p className="text-[10px] md:text-[16px] text-neutral-800 font-normal text-justify md:leading-10">
            Mal Pelayanan Publik (MPP) merupakan konsep inovatif yang
            mengintegrasikan berbagai layanan publik di satu lokasi yang nyaman
            dan mudah diakses. Tujuan utamanya adalah meningkatkan kualitas
            layanan kepada masyarakat dengan menyediakan berbagai layanan
            administrasi dari berbagai instansi pemerintah dan swasta dalam satu
            atap. MPP memudahkan masyarakat dalam mengurus berbagai keperluan
            administrasi tanpa harus berpindah-pindah tempat. Dasar hukum
            pendirian MPP Lampung Timur adalah sebagai berikut: Peraturan
            Presiden Republik Indonesia Nomor 89 Tahun 2021 tentang
            Penyelenggaraan Mal Pelayanan Publik. Peraturan Menteri PANRB Nomor
            23 Tahun 2017 tentang Penyelenggaraan Mal Pelayanan Publik.
            Peraturan Menteri PANRB Nomor 92 Tahun 2021 tentang Petunjuk Teknis
            Penyelenggaraan Mal Pelayanan Publik. MPP dirancang untuk memberikan
            kemudahan, kenyamanan, dan efisiensi dalam pelayanan publik, serta
            meningkatkan transparansi dan akuntabilitas dalam pelayanan
            pemerintah. Lokasi yang terpadu juga menghemat waktu dan biaya bagi
            masyarakat yang memerlukan berbagai jenis layanan.
          </p>
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

          <div className="bg-secondary-200 p-8 rounded-xl flex flex-col w-full">
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

          {accordions.map(
            (tab: { title: string; image: string }, i: number) => {
              return (
                <Accordion key={i} type="single" collapsible>
                  <AccordionItem className="w-full h-full mb-3" value="item-1">
                    <AccordionTrigger className="md:h-[60px]">
                      {tab.title}
                    </AccordionTrigger>
                    <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
                      <Image
                        src={tab.image}
                        className="md:w-full md:h-[190px]"
                        alt="permohonan & antrian"
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            }
          )}

          <div className="flex self-end h-full">
            <p className="self-end border-b text-primary-800">
              Lihat Selengkapnya...
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-x-4 mb-3">
        <div className="flex flex-col bg-primary-200 w-full rounded-xl">
          <div className="bg-primary-700 rounded-t-xl">
            <h4 className="text-primary-50 text-[20px] md:text-[26px] px-8 py-4 font-semibold">
              Video Mal Pelayanan Publik
            </h4>
          </div>

          <div className="m-4">
            <Image
              src={image}
              className="w-full h-[200px] md:h-[350px]"
              alt="permohonan & antrian"
            />
          </div>
        </div>

        <div className="flex flex-col bg-primary-200 w-full rounded-xl mt-3 md:mt-0">
          <div className="bg-primary-700 rounded-t-xl">
            <h4 className="text-primary-50 text-[20px] md:text-[26px] px-8 py-4 font-semibold">
              Alur Pelayanan
            </h4>
          </div>

          <div className="m-4">
            <Image
              src={image}
              className="w-full h-[200px] md:h-[350px]"
              alt="permohonan & antrian"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-primary-200 rounded-xl p-6 md:p-8">
        <h3 className="text-[26px] text-center md:text-start md:text-[32px] mb-5 md:mb-0 text-primary-800 font-semibold">
          Aplikasi Pendukung Mal Pelayanan Publik
        </h3>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-x-2 gap-y-4">
          <CardAplikasiPendukung />
          <CardAplikasiPendukung />
          <CardAplikasiPendukung />
        </div>
      </div>
    </div>
  );
}
