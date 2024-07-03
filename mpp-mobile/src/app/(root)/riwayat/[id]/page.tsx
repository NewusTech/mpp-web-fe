"use client";

import { PermohonanDataType } from "@/types/type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import formatDate from "@/helpers/logout/formatted";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HasilPermohonan({
  params,
}: {
  params: { id: number };
}) {
  const [permohonan, setPermohonan] = useState<PermohonanDataType>();

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

  console.log(permohonan, "permohonan");

  return (
    <div className="flex flex-col bg-neutral-50 px-14 py-8 rounded-xl mx-24 mt-[32px]">
      <div className="grid grid-cols-2 md:grid-cols-none md:flex md:flex-row md:justify-between md:w-full md:mb-8">
        <h5 className="text-[20px] text-start text-primary-800 font-semibold">
          Nomor Permohonan: {permohonan?.id}
        </h5>

        <h5 className="text-[20px] text-end text-success-700 font-semibold">
          {permohonanStatus}
        </h5>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h6 className="text-[16px] text-secondary-700 font-semibold">
          Detail: {permohonan?.layanan_name}
        </h6>

        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[8px]">
            <p className="text-[16px] text-primary-900 font-semibold">
              Tanggal dibuat permohonanan
            </p>

            <p className="text-[16px] text-neutral-900 font-normal">
              {permohonanDate}
            </p>
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="text-[16px] text-primary-900 font-semibold">
              Tanggal Permohonan Selesai
            </p>

            <p className="text-[16px] text-neutral-900 font-normal">
              {permohonan?.tanggalSelesai ?? permohonanSelesai}
            </p>
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="text-[16px] text-primary-900 font-semibold">Pesan</p>

            <p className="text-[16px] text-neutral-900 font-normal">
              {permohonan?.pesan ?? permohonan?.pesan}
            </p>
          </div>
        </div>

        <Link
          href={"/skm"}
          className="text-[12px] text-warning-700 font-normal mt-[12px]">
          Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu agar
          dapat mengunduh hasil permohonan.
        </Link>
      </div>

      <div className="flex flex-row items-center justify-center mt-8 gap-x-4">
        <Button
          type="submit"
          className="text-[12px] text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
          Lihat
        </Button>

        <Button
          type="submit"
          className="text-[12px] text-neutral-50 font-normal">
          Unduh
        </Button>
      </div>
    </div>
  );
}
