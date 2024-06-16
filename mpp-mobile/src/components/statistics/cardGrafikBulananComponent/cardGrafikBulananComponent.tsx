import React from "react";

export default function CardGrafikBulananComponent() {
  return (
    <div className="grid grid-rows-5 w-full bg-neutral-50 rounded-2xl shadow-xl p-[17px] gap-2">
      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">Instansi</p>

        <p className="text-[12px] font-normal text-primary-800">
          : Dinas Kesehatan dan Kebudayaan
        </p>
      </div>

      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">Total</p>

        <p className="text-[12px] font-normal text-primary-800">: 300</p>
      </div>

      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">Antrian</p>

        <p className="text-[12px] font-normal text-primary-800">: 100</p>
      </div>

      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">Permohonan</p>

        <p className="text-[12px] font-normal text-primary-800">: 100</p>
      </div>

      <div className="grid grid-cols-2 w-full h-[40px]">
        <p className="text-[12px] font-semibold text-primary-800">SKM</p>

        <p className="text-[12px] font-normal text-primary-800">: 100</p>
      </div>
    </div>
  );
}
