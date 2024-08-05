import { PengaduanType } from "@/types/type";
import React from "react";
import { formatLongDate } from "@/helpers/logout/formatted";
import Link from "next/link";
import { formatCreateTime } from "@/utils/formatTime";

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

  let pengaduanTime = "";
  if (pengaduan.createdAt) {
    pengaduanTime = formatCreateTime(pengaduan.createdAt);
  }

  let statusColor = "";

  switch (pengaduan?.status) {
    case 1:
      statusColor = "text-secondary-700";
      break;
    case 2:
      statusColor = "text-warning-700";
      break;
    case 0:
      statusColor = "text-primary-700";
      break;
    case 3:
      statusColor = "text-success-700";
      break;
    default:
      statusColor = "text-success-700";
      break;
  }

  return (
    <div className="slide-up-animation bg-primary-50 rounded-xl shadow-md p-6 mt-4">
      <div className="flex flex-col w-full gap-y-4">
        <div className="grid grid-cols-2 w-full">
          <p className="text-[12px] text-primary-800 font-semibold">Layanan</p>

          <p className="text-[12px] text-primary-800 font-normal">
            : {pengaduan.Layanan.name}
          </p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <p className="text-[12px] text-primary-800 font-semibold">
            Judul Pengajuan
          </p>

          <p className="text-[12px] text-primary-800 font-normal">
            : {pengaduan.judul}
          </p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <p className="text-[12px] text-primary-800 font-semibold">
            Hari / Tanggal
          </p>

          <p className="text-[12px] text-primary-800 font-normal">
            : {dayName} / {datePengaduanFormatted}
          </p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <p className="text-[12px] text-primary-800 font-semibold">Waktu</p>

          <p className="text-[12px] text-primary-800 font-normal">
            : {pengaduanTime} WIB
          </p>
        </div>

        <div className="grid grid-cols-2 w-full">
          <p className="text-[12px] text-primary-800 font-semibold">Status</p>

          <p className={`text-[12px] ${statusColor} font-normal`}>
            :{" "}
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

      <div className="flex w-full self-end justify-end mt-6">
        {pengaduan.status === 0 ||
        pengaduan.status === 1 ||
        pengaduan.status === 2 ? (
          <div className="w-3/12 h-[18px] py-4 text-[14px] cursor-not-allowed flex items-center justify-center rounded-full bg-neutral-700 hover:bg-neutral-600">
            Lihat
          </div>
        ) : (
          <Link
            href={`/pengaduan/${pengaduan.id}/pengaduan-hasil`}
            className="w-3/12 h-[18px] py-4 px-5 text-neutral-900 flex items-center justify-center rounded-full text-[14px] bg-secondary-700 hover:bg-secondary-600">
            Lihat
          </Link>
        )}
      </div>
    </div>
  );
}
