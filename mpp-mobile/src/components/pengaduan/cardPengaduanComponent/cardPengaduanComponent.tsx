import { PengaduanType } from "@/types/type";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";
import { formatLongDate } from "@/helpers/logout/formatted";

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
    <div className="bg-primary-100 rounded-2xl shadow-md px-[16px] py-[29px] mt-[16px]">
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
              : pengaduan.status === 3
              ? "Gagal"
              : "Selesai"}
          </p>
        </div>
      </div>

      <div className="flex w-full self-end justify-end">
        {pengaduan.status !== 4 ? (
          <div className="w-3/12 h-[18px] py-4 text-[14px] cursor-not-allowed flex items-center justify-center rounded-full bg-neutral-700 hover:bg-neutral-600">
            Lihat
          </div>
        ) : (
          <Dialog>
            <DialogTrigger>
              <div className="w-full h-[18px] py-4 px-5 flex items-center justify-center rounded-full text-[14px] bg-secondary-700 hover:bg-secondary-600">
                Lihat
              </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col justify-between w-10/12 bg-neutral-50 rounded-2xl">
              <div className="flex flex-col mx-[32px] my-[32px]">
                <div className="flex flex-col gap-[14px]">
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-primary-900 font-semibold">
                      Instansi
                    </p>

                    <p className="text-[16px] text-neutral-900 font-normal">
                      {pengaduan.Instansi.name}
                    </p>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-primary-900 font-semibold">
                      Layanan
                    </p>

                    <p className="text-[16px] text-neutral-900 font-normal">
                      {pengaduan.Layanan.name}
                    </p>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-primary-900 font-semibold">
                      Judul Pengaduan
                    </p>

                    <p className="text-[16px] text-neutral-900 font-normal">
                      {pengaduan.judul}
                    </p>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-primary-900 font-semibold">
                      Aduan
                    </p>

                    <p className="text-[16px] text-neutral-900 font-normal">
                      {pengaduan.aduan}
                    </p>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-primary-900 font-semibold">
                      Dokumen
                    </p>

                    <div className="w-full h-full md:w-1/2 md:h-1/2">
                      {pengaduan.image && (
                        <Image
                          className="md:w-full md:h-full object-contain md:object-cover rounded-xl"
                          width={150}
                          height={150}
                          src={pengaduan.image}
                          alt={pengaduan.judul}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-primary-900 font-semibold">
                      Balasan
                    </p>

                    <p className="text-[16px] text-neutral-900 font-normal">
                      {pengaduan.jawaban || "Belum ada balasan!"}
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
