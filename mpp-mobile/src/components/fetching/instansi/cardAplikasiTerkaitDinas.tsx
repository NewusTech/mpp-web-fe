import { AppIntansiType, AppType } from "@/types/type";
import { truncateTitle } from "@/utils/formatTitle";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

export default function CardAplikasiTerkaitDinas({
  app,
}: {
  app: AppIntansiType;
}) {
  const formatName = truncateTitle(app.name, 42);
  const formatDesc = truncateTitle(app.desc, 20);
  return (
    <Link
      href={app?.link}
      target="_blank"
      className="slide-up-animation gap-x-3 md:gap-y-0 md:gap-x-5 bg-neutral-50 w-full min-h-[100px] md:min-h-[100px] flex flex-row items-center p-1 md:p-4 rounded-md shadow-md">
      <div className="w-7/12 md:h-full flex justify-center p-2">
        <Image
          src={app?.file}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-full"
          alt={app?.name}
        />
      </div>

      <div className="flex flex-col text-start w-full">
        <p className="font-semibold text-primary-700 text-[14px] md:text-[16px] hover:underline">
          {formatName}
        </p>
        <p className="font-normal text-neutral-900 text-[12px] md:text-[14px]">
          {formatDesc}
        </p>
      </div>
    </Link>
  );
}
