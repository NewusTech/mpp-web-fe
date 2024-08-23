"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/legacy/image";
import { AntrianBookingType } from "@/types/type";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import fetchGetBookingId from "@/components/fetching/getbookingid/getbookingid";
import { Loader } from "lucide-react";
import { Raleway } from "next/font/google";
import logo from "@/../public/assets/DesignLogoMpp.svg";
import { formatTime } from "@/utils/formatTime";
import { formattedDate } from "@/helpers/logout/formatted";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";
import { RichTextDisplay } from "@/components/richTextDisplay/richTextDisplay";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function BookingResult({ params }: { params: { id: number } }) {
  const token = Cookies.get("Authorization");
  const [antrian, setAntrian] = useState<AntrianBookingType>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAntrian = async (id: number) => {
    try {
      const result = await fetchGetBookingId(id);

      setAntrian(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    fetchAntrian(params.id);
  }, [params.id]);

  const downloadAntrian = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/bookingantrian/pdf/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          cache: "no-store",
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Nomor Antrin.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Berhasil download laporan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  let time = "";

  if (antrian?.waktu) {
    time = formatTime(antrian?.waktu);
  }

  let date = "";
  if (antrian?.tanggal) {
    date = formattedDate(antrian?.tanggal);
  }

  return (
    <div className="bg-primary-100 md:mb-0 pb-32 md:pb-[150px]">
      <div className="flex items-center w-full justify-center bg-primary-100 md:mt-8 mt-[24px] md:pb-8">
        <div className="flex flex-col w-full mx-[35px] md:mx-[70px] gap-[12px]">
          <div className="flex flex-col md:justify-center md:items-center md:self-center mb-8 md:mb-10 md:w-6/12">
            <div className="flex flex-col items-center w-full bg-neutral-50 shadow-md rounded-xl py-6">
              <div className="flex flex-row justify-center items-center self-center gap-x-3 w-full mb-4">
                <div className="w-2/12 h-[64px] flex items-center">
                  <Image
                    src={logo}
                    alt="Lampung Timur"
                    className="w-full h-full object-fit"
                    width={1000}
                    height={1000}
                  />
                </div>

                <div className="flex flex-col justify-center leading-none">
                  <h3
                    className={`${raleway.className} font-bold text-[18px] text-secondary-700 py-[4px]`}>
                    MAL PELAYANAN PUBLIK
                  </h3>

                  <h3
                    className={`${raleway.className} font-normal text-primary-700 text-[16px]`}>
                    Kabupaten Lampung Timur
                  </h3>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 mt-3">
                <h4 className="text-[16px] md:text-[20px] font-semibold">
                  {antrian?.Instansi.name}
                </h4>

                <h5 className="text-[12px] md:text-[16px] text-center font-extralight">
                  {antrian?.Layanan.name}
                </h5>
              </div>

              <div className="flex flex-col w-full mt-3 mb-4">
                <div className="flex flex-col w-full mt-3 mb-2">
                  <div className="flex justify-center md:justify-center mb-2 gap-x-20">
                    <p className="text-[10px] md:text-[16px] font-extralight">
                      {date}
                    </p>

                    <p className="text-[10px] md:text-[16px] font-extralight">
                      {time} WIB
                    </p>
                  </div>

                  <div className="w-full h-full rounded-xl flex items-center justify-center">
                    {antrian?.qrcode && (
                      <Image
                        src={antrian?.qrcode}
                        className="w-full h-full object-cover rounded-xl"
                        alt="QR CODE"
                        width={200}
                        height={200}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <h5 className="text-[14px] md:text-[20px] font-normal">
                    Loket: {antrian?.Layanan.code}
                  </h5>
                </div>
              </div>

              <div className="h-[40px] w-[160px] md:w-1/2 flex self-center justify-center items-center">
                <Button
                  onClick={() => downloadAntrian(antrian?.id ?? 0)}
                  type="submit"
                  variant="error"
                  disabled={isLoading ? true : false}>
                  {isLoading ? <Loader className="animate-spin" /> : "Print"}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[16px] md:mx-12 pb-8">
            <h5 className="text-[14px] md:text-[20px] font-semibold">
              Persyaratan yang harus dibawa
            </h5>

            <div className="text-[12px] md:text-[16px] text-neutral-900 font-normal">
              {antrian?.Layanan.syarat && (
                <RichTextDisplay content={antrian?.Layanan.syarat} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
