"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import qrcode from "@/../public/assets/png-transparent-qr-code-information-qr-code-android-qrcode-text-rectangle-monochrome-thumbnail.png";
import Image from "next/legacy/image";
import { AntrianBookingType } from "@/types/type";
import Cookies from "js-cookie";
import { toast } from "sonner";
import parse from "html-react-parser";

export default function BookingResult({ params }: { params: { id: number } }) {
  const [antrian, setAntrian] = useState<AntrianBookingType>();

  const fetchAntrian = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/antrian/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("Authorization")}`,
          },
          cache: "no-store",
        }
      );

      const result = await response.json();

      setAntrian(result.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchAntrian(params.id);
  }, [params.id]);

  return (
    <div className="bg-primary-100 md:mb-0 pb-32 md:pb-[150px]">
      <div className="flex items-center w-full justify-center bg-primary-100 md:mt-8 mt-[24px] md:pb-8">
        <div className="flex flex-col w-full mx-[35px] md:mx-[70px] gap-[12px]">
          <div className="flex flex-col md:justify-center md:items-center md:self-center mb-8 md:mb-10 md:w-6/12">
            <div className="flex flex-col items-center w-full bg-neutral-50 shadow-md rounded-xl py-6">
              <div className="flex flex-col items-center justify-center gap-2">
                <h4 className="text-[16px] md:text-[20px] font-semibold">
                  {antrian?.Instansi.name}
                </h4>

                <h5 className="text-[12px] md:text-[16px] font-extralight">
                  {antrian?.Layanan.name}
                </h5>
              </div>

              <div className="flex flex-col mt-3 mb-4">
                <div className="flex flex-col w-full mt-3 mb-2">
                  <div className="flex justify-between mb-2">
                    <p className="text-[10px] md:text-[16px] font-extralight">
                      {antrian?.tanggal}
                    </p>

                    <p className="text-[10px] md:text-[16px] font-extralight">
                      {antrian?.waktu}
                    </p>
                  </div>

                  <div className="w-full h-full rounded-xl flex items-center justify-center">
                    {antrian?.qrcode && (
                      <Image
                        src={antrian?.qrcode}
                        className="w-full h-full object-contain rounded-xl"
                        alt="QR CODE"
                        width={200}
                        height={200}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <h5 className="text-[14px] md:text-[20px] font-semibold">
                    No. Antrian: {antrian?.id}
                  </h5>

                  <h5 className="text-[14px] md:text-[20px] font-normal">
                    Loket: {antrian?.Instansi.name}
                  </h5>
                </div>
              </div>

              <div className="h-[40px] w-[160px] md:w-1/2 flex self-center justify-center items-center">
                <Button type="submit" variant="error">
                  Print
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[16px] md:mx-12 pb-8">
            <h5 className="text-[14px] md:text-[20px] font-semibold">
              Persyaratan yang harus dibawa
            </h5>

            <ul className="list-disc list-inside ml-[12px]">
              <li className="text-[12px] md:text-[16px] text-[#656565] font-normal">
                {antrian?.Layanan.syarat && parse(antrian?.Layanan.syarat)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
