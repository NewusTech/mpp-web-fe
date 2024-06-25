import React from "react";
import image from "@/../../public/assets/undraw_synchronize_re_4irq.svg";
import Image from "next/image";

export default function CardAplikasiPendukung() {
  return (
    <div className="bg-neutral-50 md:w-[432px] flex flex-col md:flex-row p-5 rounded-xl">
      <div className="md:w-[100px] md:h-[100px] rounded-xl md:rounded-[50px] bg-primary-700">
        <Image src={image} className="w-full" alt="permohonan & antrian" />
      </div>

      <div className="flex flex-col justify-center mt-3 md:mt-0 md:ml-10 w-full md:w-1/2">
        <p className="font-semibold text-primary-700 text-[20px]">
          lorem ipsum
        </p>

        <p className="text-primary-700 text-[16px]">
          lorem ipsum ges hoha yeaya icikiwir
        </p>
      </div>
    </div>
  );
}
