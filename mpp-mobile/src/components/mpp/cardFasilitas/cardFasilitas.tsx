"use client";

import React, { useState } from "react";
import Image from "next/legacy/image";
import { FacilityType } from "@/types/type";

export default function CardFasilitas({
  fasilitas,
}: {
  fasilitas: FacilityType;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col w-full bg-neutral-50 rounded-xl">
      <div className="w-full h-full" onClick={openModal}>
        <Image
          src={fasilitas.image}
          className="w-full h-full object-fit rounded-t-xl cursor-pointer"
          alt={fasilitas.title}
          width={430}
          height={367}
        />
      </div>

      <div className="flex items-center py-2 px-4">
        <p className="text-primary-700 font-semibold text-[16px]">
          {fasilitas.title}
        </p>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-90 z-50"
          onClick={handleBackdropClick}>
          <div
            className="relative w-8/12 h-4/6 bg-neutral-50 rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}>
            <Image
              src={fasilitas.image}
              alt={fasilitas.title}
              layout="fill"
              width={430}
              height={367}
              className="w-full h-full object-fit rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
