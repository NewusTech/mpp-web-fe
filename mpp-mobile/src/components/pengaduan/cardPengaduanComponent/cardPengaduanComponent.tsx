import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import React from "react";

export default function CardPengaduanComponent() {
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
        <Button
          className="w-[48px] h-[18px] text-[8px] bg-secondary-700"
          type="submit"
          variant="success">
          <Link href="/layanan/upload-file">Lihat</Link>
        </Button>
      </div>
    </div>
  );
}
