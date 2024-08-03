"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PopUpAntrianComponent from "../popUpAntrianComponent/popUpAntrianComponent";
import { AntrianDataType } from "@/types/type";

export default function PopAntrianComponent({
  antrian,
}: {
  antrian: AntrianDataType;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-primary-700 rounded-full py-1.5 px-6 text-neutral-50 text-[12px] cursor-pointer">
          Lihat
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center w-10/12 md:w-6/12">
        <PopUpAntrianComponent antrian={antrian} />
      </DialogContent>
    </Dialog>
  );
}
