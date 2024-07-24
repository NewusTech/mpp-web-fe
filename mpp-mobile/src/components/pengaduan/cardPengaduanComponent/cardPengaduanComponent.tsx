import { PengaduanType } from "@/types/type";
import React from "react";
import { formatLongDate } from "@/helpers/logout/formatted";
import Link from "next/link";

export default function CardPengaduanComponent({
  pengaduan,
}: {
  pengaduan: PengaduanType;
}) {
  const datePengaduan = pengaduan.createdAt;
  const date = new Date(datePengaduan);
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

  let datePengaduanFormatted = "";
  if (datePengaduan) {
    datePengaduanFormatted = formatLongDate(`${datePengaduan}`);
  }

  return (
    <div className="bg-primary-100 rounded-xl shadow-md px-[16px] py-[29px] mt-[16px]">
      <div className="grid grid-rows-3">
        <div className="grid grid-cols-2 w-full h-[40px] mb-4">
          <p className="text-[12px] text-primary-800 font-semibold">Layanan</p>

          <p className="text-[12px] text-primary-800 font-normal">
            : {pengaduan.Layanan.name}
          </p>
        </div>

        <div className="grid grid-cols-2 w-full h-[40px]">
          <p className="text-[12px] text-primary-800 font-semibold">
            Judul Pengajuan
          </p>

          <p className="text-[12px] text-primary-800 font-normal">
            : {pengaduan.judul}
          </p>
        </div>

        <div className="grid grid-cols-2 w-full h-[40px]">
          <p className="text-[12px] text-primary-800 font-semibold">
            Hari / Tanggal
          </p>

          <p className="text-[12px] text-primary-800 font-normal">
            : {dayName} / {datePengaduanFormatted}
          </p>
        </div>

        <div className="grid grid-cols-2 w-full h-[40px]">
          <p className="text-[12px] text-primary-800 font-semibold">Status</p>

          <p className="text-[12px] text-primary-800 font-normal">
            :
            {pengaduan.status === 0
              ? "Belum diproses"
              : pengaduan.status === 1
              ? "Sedang ditindak lanjuti"
              : pengaduan.status === 2
              ? "Sudah ditindak lanjuti"
              : "Selesai"}
          </p>
        </div>
      </div>

      <div className="flex w-full self-end justify-end">
        {pengaduan.status !== 3 ? (
          <div className="w-3/12 h-[18px] py-4 text-[14px] cursor-not-allowed flex items-center justify-center rounded-full bg-neutral-700 hover:bg-neutral-600">
            Lihat
          </div>
        ) : (
          <Link
            href={`/pengaduan/${pengaduan.id}/pengaduan-hasil`}
            className="w-3/12 h-[18px] py-4 px-5 flex items-center justify-center rounded-full text-[14px] bg-secondary-700 hover:bg-secondary-600">
            Lihat
          </Link>
        )}
      </div>
    </div>
  );
}
