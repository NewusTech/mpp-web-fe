import React from "react";
import Image from "next/legacy/image";
import { AppType } from "@/types/type";

export default function CardAplikasiPendukung({ app }: { app: AppType }) {
  return (
    <div className="bg-neutral-50 w-full md:h-full md:flex-none grid grid-cols-3 place-items-center p-4 gap-x-4 rounded-xl shadow-md">
      <div className="max-w-max md:h-full flex items-center justify-center rounded-full bg-primary-700 p-2">
        <Image
          src={app.image}
          width={100}
          height={100}
          className="w-full h-full object-contain rounded-full"
          alt="permohonan & antrian"
        />
      </div>

      <div className="flex flex-col col-span-2 justify-center mt-3 md:mt-0 w-full">
        <p className="font-semibold text-primary-700 text-[18px]">{app.name}</p>

        <p className="text-primary-700 truncate text-[14px]">{app.desc}</p>
      </div>
    </div>
  );
}
