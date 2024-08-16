import { AppType } from "@/types/type";
import { truncateTitle } from "@/utils/formatTitle";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

export default function CardAplikasiTerkaitDinas({ app }: { app: AppType }) {
  const formatName = truncateTitle(app.name, 42);
  const formatDesc = truncateTitle(app.desc, 20);
  return (
    <Link
      href={app.link}
      target="_blank"
      className="slide-up-animation bg-neutral-50 w-full flex flex-row items-center p-1 md:p-4 rounded-md shadow-md">
      <div className="flex justify-center">
        <Image
          src={app.image}
          width={150}
          height={150}
          className="w-full h-full object-cover rounded-full"
          alt={app.name}
        />
      </div>

      <div className="flex flex-col text-start">
        <p className="font-semibold text-primary-700 text-[12px] md:text-[16px] hover:underline">
          {formatName}
        </p>
        <p className="font-normal text-neutral-900 text-[10px] md:text-[14px]">
          {formatDesc}
        </p>
      </div>
    </Link>
  );
}
