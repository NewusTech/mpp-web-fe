"use client";

import { PermohonanDataType } from "@/types/type";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { formatLongDate } from "@/helpers/logout/formatted";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/legacy/image";
import Swal from "sweetalert2";

export default function HasilPermohonan({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const token = Cookies.get("Authorization");
  const [permohonan, setPermohonan] = useState<PermohonanDataType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  let dateBalesan = "";

  if (permohonan?.updatedAt) {
    dateBalesan = formatLongDate(permohonan?.updatedAt);
  }

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
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    fetchRiwayatPermohonan(params.id);
  }, [params.id]);

  let permohonanDate = "";

  if (permohonan?.createdAt) {
    permohonanDate = formatLongDate(`${permohonan?.createdAt}`);
  }

  let permohonanStatus;

  if (permohonan?.status === 1 || permohonan?.status === 2) {
    permohonanStatus = "Sedang diproses";
  } else if (permohonan?.status === 0) {
    permohonanStatus = "Belum diproses";
  } else if (permohonan?.status === 3) {
    permohonanStatus = "Selesai";
  } else if (permohonan?.status === 4) {
    permohonanStatus = "Ditolak";
  } else if (permohonan?.status === 5) {
    permohonanStatus = "Butuh Perbaiki";
  } else {
    permohonanStatus = "Sudah Diperbaiki";
  }

  let statusColor = "";

  switch (permohonan?.status) {
    case 1:
      statusColor = "text-secondary-700";
      break;
    case 2:
      statusColor = "text-secondary-700";
      break;
    case 0:
      statusColor = "text-primary-700";
      break;
    case 3:
      statusColor = "text-success-700";
      break;
    case 4:
      statusColor = "text-error-700";
      break;
    case 5:
      statusColor = "text-warning-700";
      break;
    default:
      statusColor = "text-success-600";
      break;
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
        Swal.fire({
          icon: "success",
          title: "Berhasil download laporan!",
          timer: 2000,
          showConfirmButton: false,
          position: "center",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-6 md:mx-20 bg-neutral-50 md:mb-32 px-6 md:px-14 py-6 rounded-xl mt-6">
      <div className="grid grid-cols-2 md:grid-cols-none md:flex md:flex-row md:justify-between items-center md:w-full md:mb-8">
        <div className="flex flex-row items-center">
          <button onClick={() => router.back()}>
            <ChevronLeft className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] text-neutral-800 mr-2 md:mr-4" />
          </button>

          <h5 className="text-[14px] md:text-[20px] text-start text-primary-800 font-semibold">
            Nomor Permohonan: {permohonan?.id}
          </h5>
        </div>

        <h5
          className={`text-[14px] md:text-[20px] text-end ${statusColor} font-semibold`}>
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
              {dateBalesan}
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
            href={"/survei"}
            className="text-[12px] animate-bounce underline text-warning-700 font-normal mt-[12px]">
            Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu
            agar dapat mengunduh hasil permohonan.
          </Link>
        ) : permohonan?.status === 4 ? (
          <p className="hidden text-[12px] text-warning-700 font-normal mt-[12px]">
            Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu
            agar dapat mengunduh hasil permohonan.
          </p>
        ) : (
          <p className="text-[12px] text-warning-700 font-normal mt-[12px]">
            Silahkan mengisi survey kepuasan masyarakat (SKM) terlebih dahulu
            agar dapat mengunduh hasil permohonan.
          </p>
        )}
      </div>

      <div className="flex flex-row items-center justify-center mt-8 gap-x-4">
        {permohonan?.input_skm === true && permohonan?.status === 3 ? (
          <Button
            onClick={() => openModal()}
            type="submit"
            className="text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Lihat
          </Button>
        ) : permohonan?.status === 4 ? (
          <Button
            disabled
            type="submit"
            className="hidden text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Lihat
          </Button>
        ) : (
          <Button
            disabled
            type="submit"
            className="text-[12px] md:w-2/12 text-primary-700 hover:bg-neutral-200 font-normal bg-neutral-50 border border-neutral-700">
            Lihat
          </Button>
        )}

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}>
            <div className="bg-neutral-50 p-4 rounded-xl w-10/12 md:w-6/12 h-4/6">
              {permohonan?.fileoutput && (
                <iframe
                  allowFullScreen
                  src={permohonan?.fileoutput}
                  title="Manual Book"
                  className="w-full h-full rounded-md">
                  {permohonan?.layanan_name}
                </iframe>
              )}
            </div>
          </div>
        )}

        {permohonan?.input_skm === false && permohonan?.status === 3 ? (
          <Button
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        ) : permohonan?.input_skm === true && permohonan?.status === 3 ? (
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
        ) : permohonan?.status === 4 ? (
          <Button
            className="hidden text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        ) : permohonan?.status === 5 ? (
          <Link
            href={`/riwayat/permohonan-update/${permohonan?.id}/`}
            className="w-4/12 md:w-2/12 text-center bg-primary-700 hover:bg-primary-600 cursor-pointer text-neutral-50 rounded-full py-2 px-2">
            Perbaiki
          </Link>
        ) : (
          <Button
            className="text-[12px] md:w-2/12 text-neutral-50 font-normal"
            disabled>
            Unduh
          </Button>
        )}
      </div>
    </div>
  );
}
