import React from "react";
import image from "@/../../public/assets/undraw_feeling_blue_-4-b7q.svg";
import Image from "next/image";

export default function CardFasilitas() {
  return (
    <div className="flex flex-col bg-neutral-50 h-full full rounded-xl">
      <div className="md:w-[400px] h-full">
        <Image
          src={image}
          className="w-full h-full object-cover"
          alt="Buru"
          width={367}
          height={367}
        />
      </div>

      <div className="flex items-center py-2 px-4">
        <p className="text-primary-700 font-semibold text-[16px]">
          Toilet Umum
        </p>
      </div>
    </div>
  );
}
