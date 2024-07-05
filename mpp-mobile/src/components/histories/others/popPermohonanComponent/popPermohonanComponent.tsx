"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PopUpPermohonanComponent from "../popUpPermohonanComponent/popUpPermohonanComponent";
import { PermohonanDataType } from "@/types/type";
import Link from "next/link";

export default function PopPermohonanComponent({
  permohonan,
}: {
  permohonan: PermohonanDataType;
}) {
  let permohonanStatus;

  if (permohonan.status === 1 || permohonan.status === 2) {
    permohonanStatus = "Sedang diproses";
  } else if (permohonan.status === 0) {
    permohonanStatus = "Belum diproses";
  } else if (permohonan.status === 3) {
    permohonanStatus = "Selesai";
  } else {
    permohonanStatus = "Ditolak";
  }

  const isConditionMet = (permohonan: PermohonanDataType["status"]) => {
    return permohonan !== 3;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isConditionMet(permohonan.status)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        {isConditionMet(permohonan.status) ? (
          <div>
            <Link
              href={`riwayat/${permohonan.id}`}
              className="bg-primary-700 hover:bg-primary-600 rounded-full text-[12px] py-1 px-5 text-neutral-50">
              Lihat
            </Link>
          </div>
        ) : (
          <div
            onClick={handleClick}
            aria-disabled="true"
            className="bg-gray-400 rounded-full py-1 px-5 text-neutral-50 text-[12px] cursor-not-allowed">
            Lihat
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between w-[325px] md:w-[620px] bg-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex w-full">
            <div className="grid grid-cols-2 md:grid-cols-none md:flex md:flex-row md:justify-between md:w-full mx-[32px] my-[10px] md:pt-5">
              <h5 className="text-[20px] text-start text-primary-800 font-semibold">
                {permohonan.instansi_name}
              </h5>

              <h5 className="text-[20px] text-end text-success-700 font-semibold">
                {permohonanStatus}
              </h5>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div>
          <PopUpPermohonanComponent permohonan={permohonan} />
        </div>

        <div className="flex justify-center items-end mx-[10px] mb-[10px] mt-[24px] md:pb-5">
          <Button type="submit" variant="link">
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
