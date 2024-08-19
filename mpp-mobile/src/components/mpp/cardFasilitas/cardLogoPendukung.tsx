"use client";

import lampungtimur from "@/../../public/assets/Lambang_Kabupaten_Lampung_Timur (1).png";
import Image from "next/legacy/image";
import React from "react";

export default function CardLogoPendukung() {
  return (
    <div className="flex flex-row gap-x-8">
      <div className="max-w-[50px] flex flex-row">
        <Image
          src={lampungtimur}
          alt="Lampung Timur"
          className="w-full h-full"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
