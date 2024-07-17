"use client";

import fetchPengaduanDetail from "@/components/fetching/pengaduan/detail/pengaduanDetail";
import { Label } from "@/components/ui/label";
import { formatLongDate } from "@/helpers/logout/formatted";
import { PengaduanType } from "@/types/type";
import { ChevronLeft } from "lucide-react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PengaduanHasil({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [pengaduan, setPengaduan] = useState<PengaduanType>();

  const fetchPengaduan = async (id: number) => {
    try {
      const pengaduan = await fetchPengaduanDetail(id);

      setPengaduan(pengaduan.data);
    } catch (error) {
      toast("Gagal mendapatkan data!");
    }
  };

  useEffect(() => {
    fetchPengaduan(params.id);
  }, [params.id]);

  const getFileType = (url: string) => {
    const extension = url.split(".").pop();
    if (
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "png" ||
      extension === "gif"
    ) {
      return "image";
    } else if (extension === "pdf") {
      return "pdf";
    }
    return "unknown";
  };

  const fileType = pengaduan?.image ? getFileType(pengaduan.image) : "unknown";

  const datePengaduan = pengaduan?.createdAt || "";
  const dateEnd = pengaduan?.updatedAt || "";
  const date = new Date(datePengaduan);
  const dateAnswer = new Date(dateEnd);
  const daysInIndonesian = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const dayName = daysInIndonesian[date.getDay()];
  const dayAnswer = daysInIndonesian[dateAnswer.getDay()];

  let datePengaduanFormatted = "";
  if (datePengaduan) {
    datePengaduanFormatted = formatLongDate(`${datePengaduan}`);
  }

  let dateEndPengaduanFormatted = "";
  if (dateEnd) {
    dateEndPengaduanFormatted = formatLongDate(`${dateEnd}`);
  }

  return (
    <section className="flex flex-col w-full px-8 md:px-24 mt-6 pb-32 gap-y-4">
      <div className="flex flex-row w-full gap-x-4 items-center">
        <ChevronLeft
          onClick={() => router.back()}
          className="w-8 h-8 text-neutral-900"
        />

        <h3 className="text-primary-700 font-semibold text-[24px]">
          Hasil Pengaduan
        </h3>
      </div>

      <div className="flex md:flex-row flex-col w-full md:gap-x-4 gap-y-4">
        <div className="flex flex-col w-full border border-neutral-700 bg-neutral-50 rounded-xl shadow-md p-4 gap-y-4">
          <div className="flex flex-col w-full px-4 py-2 border border-neutral-600 rounded-xl">
            <Label className="text-primary-700 font-semibold text-[16px]">
              Tanggal Pengajuan
            </Label>

            <h3 className="text-neutral-900 font-normal text-[14px]">
              {dayName}, {datePengaduanFormatted}
            </h3>
          </div>

          <div className="flex flex-col w-full px-4 py-2 border border-neutral-600 rounded-xl">
            <Label className="text-primary-700 font-semibold text-[16px]">
              Balasan
              <span className="text-neutral-800 font-normal text-[12px] pl-4">
                {dayAnswer}, {dateEndPengaduanFormatted}
              </span>
            </Label>

            <h3 className="text-neutral-900 font-normal text-[14px]">
              {(pengaduan?.jawaban && pengaduan?.jawaban) ||
                "Belum ada balasan!"}
            </h3>
          </div>

          <div className="flex flex-col w-full px-4 py-2 border border-neutral-600 rounded-xl">
            <Label className="text-primary-700 font-semibold text-[16px]">
              Instansi
            </Label>

            <h3 className="text-neutral-900 font-normal text-[14px]">
              {pengaduan?.Instansi.name}
            </h3>
          </div>

          <div className="flex flex-col w-full px-4 py-2 border border-neutral-600 rounded-xl">
            <Label className="text-primary-700 font-semibold text-[16px]">
              Layanan
            </Label>

            <h3 className="text-neutral-900 font-normal text-[14px]">
              {pengaduan?.Layanan.name}
            </h3>
          </div>

          <div className="flex flex-col w-full px-4 py-2 border border-neutral-600 rounded-xl">
            <Label className="text-primary-700 font-semibold text-[16px]">
              Judul Pengaduan
            </Label>

            <h3 className="text-neutral-900 font-normal text-[14px]">
              {pengaduan?.judul}
            </h3>
          </div>

          <div className="flex flex-col w-full px-4 py-2 border border-neutral-600 rounded-xl">
            <Label className="text-primary-700 font-semibold text-[16px]">
              Aduan
            </Label>

            <h3 className="text-neutral-900 font-normal text-[14px]">
              {pengaduan?.aduan}
            </h3>
          </div>
        </div>

        <div className="w-full md:w-8/12 bg-neutral-50 rounded-xl border shadow-md border-neutral-700 p-4">
          {fileType === "image" ? (
            <div className="md:w-full md:h-full">
              {pengaduan?.image && (
                <Image
                  className="md:w-full md:h-full rounded-xl"
                  width={1000}
                  height={1000}
                  src={pengaduan.image}
                  alt={pengaduan.judul}
                />
              )}
            </div>
          ) : fileType === "pdf" ? (
            <div className="flex flex-col w-full bg-neutral-50 shadow-md rounded-xl p-2">
              <iframe
                src={pengaduan?.image}
                height={480}
                className="rounded-xl">
                {pengaduan?.judul}
              </iframe>
            </div>
          ) : (
            <div className="flex flex-col w-full bg-neutral-50 shadow-md rounded-xl p-2">
              <p>File type not supported.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
