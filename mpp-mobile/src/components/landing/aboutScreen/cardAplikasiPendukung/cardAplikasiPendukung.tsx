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
      className="slide-up-animation bg-neutral-50 w-full flex flex-row items-center p-2 rounded-md shadow-md">
      <div className="w-6/12 md:w-7/12 flex items-center justify-center p-2">
        <Image
          src={app.image}
          width={300}
          height={300}
          className="w-full h-full object-cover"
          alt="permohonan & antrian"
        />
      </div>

      <div className="flex flex-col md:mt-0 w-full text-primary-700 hover:underline pl-2">
        <p className="font-semibold text-primary-700 md:text-[16px]">
          {formatName}
        </p>
      </div>
    </Link>
  );
}
