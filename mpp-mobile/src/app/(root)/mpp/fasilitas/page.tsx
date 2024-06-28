import CardFasilitas from "@/components/mpp/cardFasilitas/cardFasilitas";
import React from "react";

export default function Fasilitas() {
  return (
    <div className="flex flex-col w-full items-center justify-center pt-[24px] px-[35px] bg-primary-100 md:px-16 mb-[24px] md:mb-0 md:pb-[150px]">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-x-3 gap-y-4">
        <CardFasilitas />
        <CardFasilitas />
        <CardFasilitas />
        <CardFasilitas />
        <CardFasilitas />
      </div>
    </div>
  );
}
