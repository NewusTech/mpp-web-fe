import React from "react";
import Image from "next/legacy/image";
import { AppType } from "@/types/type";
import Link from "next/link";
import { truncateTitle } from "@/utils/formatTitle";

export default function CardAplikasiPendukung({ app }: { app: AppType }) {
  const formatName = truncateTitle(app.name, 42);

  return (
    <Link
      href={app.link}
      target="_blank"
      className="bg-neutral-50 w-full md:h-full md:flex-none grid grid-cols-4 place-items-center p-4 gap-x-4 rounded-xl shadow-md">
      <div className="max-w-max md:h-full col-span-1 flex items-center justify-center p-2">
        <Image
          src={app.image}
          width={100}
          height={100}
          className="w-full h-full object-contain rounded-full"
          alt="permohonan & antrian"
        />
      </div>

      <div className="flex flex-col col-span-3 md:mt-0 w-full text-primary-700 hover:underline">
        <p className="font-semibold text-primary-700 text-[18px]">
          {formatName}
        </p>
      </div>
    </Link>
  );
}
