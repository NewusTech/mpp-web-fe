"use client";

import { Button } from "@/components/ui/button";
import Image from "next/legacy/image";
import { AntrianDataType } from "@/types/type";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";

export default function PopUpAntrianComponent({
  antrian,
}: {
  antrian: AntrianDataType;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const downloadAntrian = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/antrian/pdf/${id}`,
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
        toast("Berhasil download laporan");
      }
    } catch (error) {
      toast("Gagal mendapatkan data!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-10 py-4 w-full h-4/6 bg-neutral-50 shadow-md rounded-xl mt-2 gap-4">
      <div className="flex flex-col justify-center items-center mt-[18px] gap-2">
        <div className="flex justify-between w-full h-full">
          <p className="text-[14px] font-extralight">{antrian.tanggal}</p>

          <p className="text-[14px] font-extralight">{antrian.waktu}</p>
        </div>

        <div className="flex flex-col justify-center items-center w-full h-full gap-2">
          <div className="w-full h-full rounded-xl">
            <Image
              src={antrian.qrcode}
              className="w-full h-full object-contain rounded-xl"
              width={200}
              height={200}
              alt="QR CODE"
            />
          </div>

          <div className="flex flex-col w-full h-[40px] justify-center items-center md:mt-3">
            <h5 className="text-[14px] font-bold">{antrian.id}</h5>

            <h5 className="text-[14px] font-normal md:text-center">
              {antrian.Instansi.name}
            </h5>
          </div>
        </div>
      </div>

      <div className="w-8/12 h-[40px] flex self-center justify-center items-center md:pt-4">
        <Button
          onClick={() => downloadAntrian(antrian?.id ?? 0)}
          type="submit"
          className="w-full h-[40px]"
          variant="error"
          disabled={isLoading ? true : false}>
          {isLoading ? <Loader className="animate-spin" /> : "Print"}
        </Button>
      </div>

      <div className="flex flex-col w-full mt-6 gap-y-3">
        <h3 className="text-neutral-900 font-semibold text-[14px]">
          Persyaratan yang harus dibawa
        </h3>

        <ul className="gap-y-2">
          <li className="list-disc pl-4">Kartu Tanda Pengenal</li>
        </ul>
      </div>
    </div>
  );
}
