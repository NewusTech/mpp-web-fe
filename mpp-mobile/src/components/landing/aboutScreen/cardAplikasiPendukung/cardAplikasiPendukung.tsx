import React from "react";
import Image from "next/legacy/image";
import { AppType } from "@/types/type";

export default function CardAplikasiPendukung({ app }: { app: AppType }) {
  return (
    <div className="bg-neutral-50 md:w-[432px] flex flex-col md:flex-row p-5 rounded-xl">
      <div className="md:w-[100px] md:h-[100px] overflow-auto rounded-xl md:rounded-[50px] bg-primary-700">
        <Image
          src={app.image}
          width={100}
          height={100}
          className="w-full h-full object-contain"
          alt="permohonan & antrian"
        />
      </div>

      <div className="flex flex-col justify-center mt-3 md:mt-0 md:ml-10 w-full md:w-1/2">
        <p className="font-semibold text-primary-700 text-[20px]">{app.name}</p>

        <p className="text-primary-700 truncate text-[16px]">{app.desc}</p>
      </div>
    </div>
  );
}
