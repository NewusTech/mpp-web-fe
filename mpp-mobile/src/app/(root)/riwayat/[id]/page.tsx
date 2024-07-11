"use client";

import { PermohonanDataType } from "@/types/type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import formatDate from "@/helpers/logout/formatted";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HasilPermohonan({
  params,
}: {
  params: { id: number };
}) {
  const [permohonan, setPermohonan] = useState<PermohonanDataType>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchRiwayatPermohonan = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/historyform/${id}`,
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

      setPermohonan(result.data);
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  useEffect(() => {
    fetchRiwayatPermohonan(params.id);
  }, [params.id]);

  let permohonanDate = "";

  if (permohonan?.createdAt) {
    permohonanDate = formatDate(`${permohonan?.createdAt}`);
  }

  let permohonanSelesai = "";

  if (permohonan?.tanggalSelesai) {
    permohonanDate = formatDate(`${permohonan?.tanggalSelesai}`);
  }

  let permohonanStatus;

  if (permohonan?.status === 1 || permohonan?.status === 2) {
    permohonanStatus = "Sedang diproses";
  } else if (permohonan?.status === 0) {
    permohonanStatus = "Belum diproses";
  } else if (permohonan?.status === 3) {
    permohonanStatus = "Selesai";
  } else {
    permohonanStatus = "Ditolak";
  }

  const downloadPermohonan = async (
    idLayanan: number,
    idPermohonan: number
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_MPP}/user/surat/${idLayanan}/${idPermohonan}`,
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
      a.download = "Surat Permohonan.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      if (response.ok) {
        toast("Berhasil download laporan");
        setIsLoading(false);
      }
    } catch (error) {
      toast("Gagal mendapatkan data!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-6 md:mx-20 bg-neutral-50 px-6 md:px-14 py-6 rounded-xl mt-6">
      <div className="grid grid-cols-2 md:grid-cols-none md:flex md:flex-row md:justify-between items-center md:w-full md:mb-8">
        <div className="flex flex-row items-center">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] text-neutral-800 mr-2 md:mr-4" />
          </button>

          <h5 className="text-[14px] md:text-[20px] text-start text-primary-800 font-semibold">
            Nomor Permohonan: {permohonan?.id}
          </h5>
        </div>

        <h5 className="text-[14px] md:text-[20px] text-end text-success-700 font-semibold">
          {permohonanStatus}
        </h5>
      </div>

      <div className="flex flex-col gap-[10px] mt-3 md:mt-0">
        <h6 className="text-[14px] md:text-[16px] text-secondary-700 font-semibold">
          Detail: {permohonan?.layanan_name}
        </h6>

        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-col gap-2">
            <p className="text-[12px] md:text-[16px] text-primary-900 font-semibold">
              Tanggal dibuat permohonanan
            </p>

            <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal">
              {permohonanDate}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[12px] md:text-[16px] text-primary-900 font-semibold">
              Tanggal Permohonan Selesai
            </p>

            <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal">
              {permohonan?.tanggalSelesai ?? permohonanSelesai}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[12px] md:text-[16px] text-primary-900 font-semibold">
              Pesan
            </p>

            <p className="text-[12px] md:text-[16px] text-neutral-900 font-normal">
              {permohonan?.pesan ?? permohonan?.pesan}
            </p>
          </div>
        </div>

        {permohonan?.status === 3 && permohonan?.input_skm === false ? (
          <Link
            href={"/survey"}
            className="text-[12px] animate-bounce underline text-warning-700 font-normal mt-[12px]">
            Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu
            agar dapat mengunduh hasil permohonan.
          </Link>
        ) : (
          <p className="text-[12px] text-warning-700 font-normal mt-[12px]">
            Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu
            agar dapat mengunduh hasil permohonan.
          </p>
        )}
      </div>

      <div className="flex flex-row items-center justify-center mt-8 gap-x-4">
        <Button
          type="submit"
          className="text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
          Lihat
        </Button>

        {permohonan?.input_skm === false ? (
          <Button
            disabled
            type="submit"
            className="md:w-2/12 text-center bg-neutral-700 cursor-not-allowed text-neutral-50 rounded-full py-2 px-2">
            Unduh
          </Button>
        ) : (
          <Button
            type="submit"
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            onClick={() =>
              downloadPermohonan(
                permohonan?.layanan_id ?? 0,
                permohonan?.id ?? 0
              )
            }
            disabled={isLoading ? true : false}>
            {isLoading ? <Loader className="animate-spin" /> : "Unduh"}
          </Button>
        )}
      </div>
    </div>
  );
}
