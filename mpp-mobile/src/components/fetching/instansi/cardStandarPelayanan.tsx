import {
  formatFileNameAndDesc,
  getFileExtension,
} from "@/helpers/logout/ekstention";
import { AppType, InstansiSopType } from "@/types/type";
import { truncateTitle } from "@/utils/formatTitle";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

export default function CardStandarPelayanan({
  item,
}: {
  item: InstansiSopType;
}) {
  const extension = getFileExtension(item?.file);
  const { name, description, image } = formatFileNameAndDesc(extension);

  return (
    <Link
      href={item?.file}
      target="_blank"
      className="slide-up-animation bg-neutral-50 w-full flex flex-row items-center p-1 md:p-4 gap-x-2 rounded-md shadow-md">
      <div className="w-2/12 md:w-4/12 flex justify-center">
        <Image
          src={image}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-full"
          alt={name}
        />
      </div>

      <div className="flex flex-col text-start">
        <p className="font-semibold text-primary-700 text-[12px] md:text-[16px] hover:underline">
          {item && item?.name}
        </p>
        <p className="font-normal text-neutral-900 text-[10px] md:text-[14px]">
          {item && item?.desc}
        </p>
      </div>
    </Link>
  );
}
