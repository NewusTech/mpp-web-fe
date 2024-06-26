import React from "react";
import image from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import Image from "next/legacy/image";
import { FacilityType } from "@/types/type";

export default function CardFasilitas({
  fasilitas,
}: {
  fasilitas: FacilityType;
}) {
  return (
    <div className="flex flex-col bg-neutral-50 rounded-xl">
      <div className="w-full h-full">
        <Image
          src={fasilitas.image}
          className="w-full h-full object-cover rounded-t-xl"
          alt={fasilitas.title}
          width={367}
          height={367}
        />
      </div>

      <div className="flex items-center py-2 px-4">
        <p className="text-primary-700 font-semibold text-[16px]">
          {fasilitas.title}
        </p>
      </div>
    </div>
  );
}
