import { PengaduanType } from "@/types/type";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";

export default function CardPengaduanComponent({
  pengaduan,
}: {
  pengaduan: PengaduanType;
}) {
  return (
    <div className="bg-primary-100 rounded-2xl shadow-xl px-[16px] py-[29px] mt-[16px]">
      <div className="grid grid-rows-3">
        <div className="grid grid-cols-2 w-full h-[40px]">
          <p className="text-[12px] text-primary-800 font-semibold">Layanan</p>

          <p className="text-[12px] text-primary-800 font-normal">
            : Pembuatan KTP dan Kartu Keluarga
          </p>
        </div>

        <div className="grid grid-cols-2 w-full h-[40px]">
          <p className="text-[12px] text-primary-800 font-semibold">
            Judul Pengajuan
          </p>

          <p className="text-[12px] text-primary-800 font-normal">
            : Nik Tidak Ditemukan
          </p>
        </div>

        <div className="grid grid-cols-2 w-full h-[40px]">
          <p className="text-[12px] text-primary-800 font-semibold">Status</p>

          <p className="text-[12px] text-primary-800 font-normal">: Terkirim</p>
        </div>
      </div>

      <div className="flex w-full self-end justify-end">
        <Dialog>
          <DialogTrigger>
            <div className="w-[48px] h-[18px] flex items-center justify-center rounded-xl text-[8px] bg-secondary-700 hover:bg-secondary-600">
              Lihat
            </div>
          </DialogTrigger>
          <DialogContent className="flex flex-col justify-between w-10/12 bg-white rounded-2xl">
            <div className="flex flex-col mx-[32px] my-[32px]">
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] text-primary-900 font-semibold">
                    Instansi
                  </p>

                  <p className="text-[16px] text-neutral-900 font-normal">
                    {pengaduan.instansi_id}
                  </p>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] text-primary-900 font-semibold">
                    Layanan
                  </p>

                  <p className="text-[16px] text-neutral-900 font-normal">
                    {pengaduan.layanan_id}
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

                  <div className="md:w-1/2 md:h-1/2">
                    {pengaduan.image && (
                      <Image
                        className="w-full h-full object-cover rounded-xl"
                        width={100}
                        height={100}
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
      </div>
    </div>
  );
}
